import { ToastContainer } from "react-toastify";
import AppName from "@/components/shared/AppName";
import { Logo } from "@/components/shared/Logo";
import { NavLink, Outlet } from "react-router";
import { routes } from "@/data/routes";

export default function AuthLayout() {

  return (
    <>
      <div className=" container mx-auto flex flex-col md:flex-row items-center min-h-dvh justify-center gap-8 max-w-3xl pt-5">
        <NavLink to={routes.home} className=" flex flex-col items-center max-w-2xl p-5 ">
          <Logo className=" rounded-full size-48 sm:size-56" />
          <AppName className=" text-6xl sm:text-7xl" />
        </NavLink>
        <div className="max-w-md mx-auto pb-10 flex-1">
          <Outlet />
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
