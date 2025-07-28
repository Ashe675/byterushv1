import { useQuantity } from "@/hooks/useQuantity";
import useQuiosco from "@/hooks/useQuiosco";
import { formatAmount } from "@/utils";
import { useMemo, useCallback } from "react";

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

export default function ProductModal() {
  const { product, handleClickModal, handleAddOrder, order } = useQuiosco();

  const productInOrder = useMemo(
    () => order.find((item) => item.productId === product?.id),
    [order, product]
  );

  const initialQuantity = productInOrder ? productInOrder.quantity : 1;

  const {
    quantity,
    increase: increaseQuantity,
    decrease: decreaseQuantity,
  } = useQuantity({
    initial: initialQuantity,
    max: MAX_QUANTITY,
    min: MIN_QUANTITY,
  });

  let productId = 0;
  if (product) {
    productId = product.id;
  }
  
  const handleClick = useCallback(() => {
    if (product) {
      handleAddOrder({ ...product, productId, quantity });
      handleClickModal();
    }
  }, [handleAddOrder, handleClickModal, product, quantity, productId]);

  if (!product) {
    return null;
  }

  const { name, image, price } = product;

  return (
    <div className=" sm:flex gap-10 relative">
      <div className=" sm:w-1/3 max-sm:mb-2">
        <img src={`/img/${image}.jpg`} alt={`${name} image`} />
      </div>
      <div className=" sm:w-2/3 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className=" text-3xl font-black text-accent-light mt-2">
            {formatAmount(price * quantity)}
          </p>
          <div className="w-36">
            <div className=" flex gap-4 mt-2">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 cursor-pointer ${
                    quantity === MIN_QUANTITY ? "opacity-50" : ""
                  }`}
                  onClick={decreaseQuantity}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <p className=" text-2xl font-semibold">{quantity}</p>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 cursor-pointer ${
                    quantity === MAX_QUANTITY ? "opacity-50" : ""
                  }`}
                  onClick={increaseQuantity}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={handleClick}
              type="button"
              className={`btn-base bg-tertiary hover:bg-[#363052]  mt-2 text-sm`}
            >
              {productInOrder ? "Actualizar pedido" : "Agregar pedido"}
            </button>
          </div>
        </div>
        <div className=" ml-5">
          <button className=" rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="size-6 cursor-pointer"
              onClick={handleClickModal}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
