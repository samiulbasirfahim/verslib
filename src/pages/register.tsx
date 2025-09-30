import { Link } from "react-router";
import Button from "../components/button";
import Input from "../components/input";
import Text from "../components/text";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRegister } from "../lib/queries/auth";
import { ApiError } from "../lib/fetcher";

type InputForm = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
};

export default function RegisterPage() {
    const [form, setForm] = useState<InputForm>({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<
        Partial<InputForm> & { non_field_error?: string }
    >({});

    const { mutate } = useRegister();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined })); // clear only relevant error
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Partial<InputForm> & { non_field_error?: string } = {};

        if (!form.username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        }
        if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        if (form.password !== form.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        mutate(form, {
            onSuccess(res: any) {
                const { _access, _refresh, user } = res;
                console.log("Registered:", user);
            },
            onError(err) {
                if (err instanceof ApiError) {
                    const apiErrors = err.data || {};
                    setErrors((prev) => ({
                        ...prev,
                        ...apiErrors, // merge field-specific errors from API
                        non_field_error: apiErrors.non_field_error || prev.non_field_error,
                    }));
                }
            },
        });
    };

    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center">
            <form
                className="bg-muted-background/20 backdrop-blur-xs p-6 flex flex-col gap-3 max-w-md w-full"
                onSubmit={handleRegister}
            >
                <Text variant="title">Register</Text>

                <Input
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={onChangeHandler}
                />
                {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                )}

                <Input
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChangeHandler}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <Input
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChangeHandler}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <Input
                    placeholder="Confirm Password..."
                    name="confirm_password"
                    type="password"
                    value={form.confirm_password}
                    onChange={onChangeHandler}
                />
                {errors.confirm_password && (
                    <p className="text-red-500 text-sm">{errors.confirm_password}</p>
                )}

                {errors.non_field_error && (
                    <p className="text-red-600 text-sm text-center">
                        {errors.non_field_error}
                    </p>
                )}

                <Button variant="primary">Register</Button>

                <Link to={"/login"} className="self-start">
                    <Button variant="link">Already have an account, login?</Button>
                </Link>
            </form>
        </div>
    );
}
