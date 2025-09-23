import { useState } from "react";
import Text from "../components/text";

export default function SettingsPage() {
    const [name] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@example.com");

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handlePasswordChange = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Password changed:", password);
        setPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
    };

    const handleEmailChange = () => {
        console.log("Email changed:", newEmail);
        setEmail(newEmail);
        setNewEmail("");
        setShowEmailForm(false);
    };

    const handleLogout = () => console.log("Logout clicked");

    return (
        <div className="min-h-[80vh] p-6 text-foreground">
            <div className="flex flex-col items-center mb-12">
                <div className="w-24 h-24 rounded-full bg-muted-foreground flex items-center justify-center mb-4">
                    <span className="text-primary text-3xl">👤</span>
                </div>
                <Text className="text-2xl font-semibold">{name}</Text>
                <Text className="text-muted-foreground">{email}</Text>
            </div>

            {/* Password Change */}
            <div className="mb-6 w-full max-w-md mx-auto">
                {!showPasswordForm ? (
                    <button
                        className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
                        onClick={() => setShowPasswordForm(true)}
                    >
                        Change Password
                    </button>
                ) : (
                    <div className="flex flex-col space-y-3">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-muted-foreground text-foreground placeholder:text-muted-foreground"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-muted-foreground text-foreground placeholder:text-muted-foreground"
                        />
                        <button
                            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
                            onClick={handlePasswordChange}
                        >
                            Save Password
                        </button>
                        <button
                            className="w-full py-2 bg-muted-foreground text-foreground rounded-lg hover:opacity-90 transition"
                            onClick={() => setShowPasswordForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Email Change */}
            <div className="mb-6 w-full max-w-md mx-auto">
                {!showEmailForm ? (
                    <button
                        className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
                        onClick={() => setShowEmailForm(true)}
                    >
                        Change Email
                    </button>
                ) : (
                    <div className="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="New Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-muted-foreground text-foreground placeholder:text-muted-foreground"
                        />
                        <button
                            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
                            onClick={handleEmailChange}
                        >
                            Save Email
                        </button>
                        <button
                            className="w-full py-2 bg-muted-foreground text-foreground rounded-lg hover:opacity-90 transition"
                            onClick={() => setShowEmailForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Logout */}
            <div className="w-full max-w-md mx-auto mt-6">
                <button
                    className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
