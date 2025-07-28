import { Logo } from "./Logo";
import { CategorySidebarItem } from "../category/CategorySidebarItem";
import AppName from "./AppName";
import useQuiosco from "@/hooks/useQuiosco";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { transformName } from "@/utils/string";
import { routes } from "@/data/routes";

export const Sidebar = () => {
  const { user, logout } = useAuth({});
  const { setOrder } = useQuiosco();

  const { categories } = useQuiosco();

  const navigate = useNavigate();

  const scrollToResume = () => {
    navigate("#resume");
    setTimeout(() => {
      const resumeElement = document.getElementById("resume");
      resumeElement?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleClickLogout = () => {
    logout();
    setOrder([]);
  };

  return (
    <aside className=" md:w-72 bg-white flex flex-col justify-between shadow-sm">
      <div>
        <div className=" p-3 flex justify-between items-center flex-wrap relative">
          <NavLink to={routes.home} className=" flex items-center max-md:justify-center wfu">
            <Logo className=" size-20" />
            <AppName className=" text-3xl" />
          </NavLink>
          <div className=" flex items-center gap-x-2 my-2 text-xl justify-center w-full">
            {user && (
              <p className="font-semibold">Hola: {transformName(user.name)}</p>
            )}
          </div>
          <button onClick={scrollToResume} className=" block md:hidden mr-5 absolute right-0 top-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
        </div>
        <div className="  px-2 max-md:grid max-md:grid-cols-2 max-md:flex-wrap max-md:gap-2 max-md:pb-7 space-y-1">
          {categories.map((category) => (
            <CategorySidebarItem key={category.id} category={category} />
          ))}
        </div>
      </div>
      <div className=" mt-5 mb-2 px-2">
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
