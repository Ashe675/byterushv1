import useQuiosco from "@/hooks/useQuiosco";
import type { Category } from "@/types/categories";
import { useMemo } from "react";

interface CategorySidebarItemProps {
  category: Category;
}

export const CategorySidebarItem = ({ category }: CategorySidebarItemProps) => {
  const { name, icon } = category;
  const { handleClickCategory, currentCategory } = useQuiosco();

  const handleClick = () => {
    handleClickCategory(category);
  };

  const isActive = useMemo(() => {
    return currentCategory!.id === category.id;
  }, [category.id, currentCategory?.id]);

  return (
    <button
      className={`flex items-center gap-4 p-2 text-sm font-medium  rounded-md ${
        isActive
          ? "bg-accent-light shadow-sm text-white"
          : "text-gray-700 hover:bg-accent-light hover:shadow-sm hover:text-white "
      } transition-colors duration-200 truncate cursor-pointer w-full`}
      onClick={handleClick}
    >
      <img
        src={`/img/icono_${icon}.svg`}
        alt={`Image of ${name}`}
        className="size-10"
      />
      <span className=" text-lg ">{name}</span>
    </button>
  );
};
