import { useAuth } from "@/hooks/useAuth";
import AppName from "../shared/AppName";
import { Logo } from "../shared/Logo";
import { transformName } from "@/utils/string";
import { routes } from "@/data/routes";
import { AdminSidebarItem } from "./AdminSidebarItem";
import { NavLink } from "react-router";

export const AdminSidebar = () => {
  const { user, logout } = useAuth({});

  const handleClickLogout = () => {
    logout();
  };

  return (
    <aside className=" md:w-72  bg-white flex flex-col">
      <div className="flex-1">
        <div className=" p-3 flex justify-between items-center flex-wrap relative">
          <NavLink
            to={routes.home}
            className=" flex items-center max-md:justify-center wfu"
          >
            <Logo className=" size-20" />
            <AppName className=" text-3xl" />
          </NavLink>
          <div className=" flex items-center gap-x-2 my-2 text-xl justify-center w-full">
            {user && (
              <p className="font-semibold">Hola: {transformName(user.name)}</p>
            )}
          </div>
        </div>

        <nav className="px-2 flex flex-col gap-2">
          <AdminSidebarItem name="Ordenes" route={routes.admin.orders} />
          <AdminSidebarItem name="Productos" route={routes.admin.products} />
        </nav>
      </div>
      <div className=" my-4 px-2">
        <button
          className=" bg-red-600 text-white w-full px-4 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer font-semibold"
          onClick={handleClickLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
