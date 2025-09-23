import { Outlet } from "react-router";
import { Navbar } from "./navbar";

export function Layout() {
  return (
    <div className="flex flex-col">
      <img
        src="/public/banner_bg.jpg"
        className="w-screen h-screen absolute top-0 -z-10"
      />
      <Navbar />
      <Outlet />
    </div>
  );
}
