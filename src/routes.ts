import { createBrowserRouter } from "react-router";
import Page_Home from "./pages";
import { Navbar } from "./layout/navbar";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Navbar,
        children: [{ index: true, Component: Page_Home }],
    },
]);
