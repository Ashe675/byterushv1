import useQuiosco from "@/hooks/useQuiosco";
import type { Product } from "@/types/products";
import { formatAmount } from "@/utils";
import { motion } from "framer-motion";

interface ProductCardItemProps {
  product: Product;
  btnAdd?: boolean;
  btnAvailable?: boolean;
  mutate?: () => void;
}
export const ProductCardItem = ({
  product,
  btnAdd = false,
  btnAvailable = false,
  mutate,
}: ProductCardItemProps) => {
  const { name, image, price } = product;
  const { handleClickModal, handleSetProduct, handleClickProductAvailable } =
    useQuiosco();

  const handleClick = () => {
    handleSetProduct(product);
    handleClickModal();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className=" flex flex-col bg-white shadow rounded "
    >
      <img src={`/img/${image}.jpg`} alt={`${name} product image`} />
      <div className=" h-full p-5 flex flex-col justify-between">
        <p className=" text-xl font-semibold">{name}</p>
        <p className=" font-black text-3xl text-accent-light">
          {formatAmount(price)}
        </p>
        {btnAdd && (
          <button
            type="button"
            className="btn-base bg-indigo-600 hover:bg-indigo-800 mt-4"
            onClick={handleClick}
          >
            Agregar
          </button>
        )}
        {btnAvailable && (
          <button
            type="button"
            className="btn-base bg-indigo-600 hover:bg-indigo-800 mt-4"
            onClick={() => {
              handleClickProductAvailable(product.id);
              if (mutate) mutate();
            }}
          >
            {product.available ? "Inhabilitar" : "Habilitar"}
          </button>
        )}
      </div>
    </motion.div>
  );
};
