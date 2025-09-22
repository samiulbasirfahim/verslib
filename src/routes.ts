import { createBrowserRouter } from "react-router";
import Page_Home from "./pages";
import { Navbar } from "./layout/navbar";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Navbar,
        children: [
            { index: true, Component: Page_Home },
            { path: "/register", Component: RegisterPage },
            { path: "/login", Component: LoginPage },
        ],
    },
]);
