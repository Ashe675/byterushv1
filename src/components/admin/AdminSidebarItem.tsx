import { useMemo } from "react";
import { Link, useLocation } from "react-router";

interface AdminSidebarItemProps {
  name: string;
  route: string;
}

export const AdminSidebarItem = ({ name, route }: AdminSidebarItemProps) => {
  const path = useLocation().pathname;

  const isActive = useMemo(() => {
    return path === route;
  }, [route, path]);
  return (
    <Link
      to={route}
      className={`flex items-center gap-4 p-2 text-sm font-medium  rounded-md ${
        isActive
          ? "bg-accent-light shadow-sm text-white"
          : "text-gray-700 hover:bg-accent-light hover:shadow-sm hover:text-white "
      } transition-colors duration-200 truncate cursor-pointer w-full`}
    >
      <span className=" text-lg ">{name}</span>
    </Link>
  );
};
