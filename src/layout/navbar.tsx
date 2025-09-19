import { Link, Outlet } from "react-router";

export function Navbar() {
    return (
        <div className="flex flex-col">
            <img
                src="/public/banner_bg.jpg"
                className="w-screen h-screen absolute top-0 -z-10"
            />
            <header className="border-b-muted-background border-b-1 sticky top-0 backdrop-blur-md bg-muted-background/30">
                <div className="container mx-auto flex justify-between ">
                    <nav className="flex items-center gap-4 py-4">
                        <Link to={"/"}>
                            <img src="/public/logo.svg" />
                        </Link>
                        <Link to={"/explore"}>Explore</Link>
                        <Link to={"/pricing"}>Pricing</Link>
                    </nav>

                    <nav className="flex items-center gap-4 py-4">
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Register</Link>
                    </nav>
                </div>
            </header>
            <Outlet />
        </div>
    );
}
