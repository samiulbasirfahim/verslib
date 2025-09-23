import { createBrowserRouter } from "react-router";
import Page_Home from "./pages";
import { Layout } from "./layout/layout";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import PricingPage from "./pages/pricing";
import ExplorePage from "./pages/explore";
import FavouritesPage from "./pages/favourites";
import SettingsPage from "./pages/settings";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Page_Home },
            { path: "/register", Component: RegisterPage },
            { path: "/login", Component: LoginPage },
            { path: "/pricing", Component: PricingPage },
            { path: "/favourites", Component: FavouritesPage },
            { path: "/settings", Component: SettingsPage },
        ],
    },
    { path: "/explore", Component: ExplorePage },
]);
