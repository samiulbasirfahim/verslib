import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export function useLogin() {
    return useMutation({
        mutationFn: (body: { email: string; password: string }) =>
            fetcher({
                endpoint: "/login",
                options: {
                    body,
                    method: "POST",
                },
            }),
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (body: { username: string; email: string; password: string }) =>
            fetcher({
                endpoint: "/register/",
                options: {
                    body,
                    method: "POST",
                },
            }),
    });
}
