import useQuiosco from "@/hooks/useQuiosco";
import { getOrders } from "@/services/OrderService";
import { formatAmount } from "@/utils";
import { useState } from "react";
import useSWR from "swr";

export const OrdersAdminPage = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/orders", getOrders, {
    refreshInterval: 1000,
  });
  const { handleClickCompleteOrder } = useQuiosco();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const hanldeClick = async (orderId: number) => {
    setIsLoadingComplete(true);
    await handleClickCompleteOrder(orderId);
    mutate();
    setIsLoadingComplete(false);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error)
    return (
      <p className=" text-red-600 font-semibold p-2 rounded mx-2 text-center">
        {error.message}
      </p>
    );

  return (
    <div className="p-2 ">
      <h1 className="text-center font-primary text-3xl text-primary pt-8">
        Ordenes
      </h1>
      <p className="text-xl my-2 text-center">
        Administra tus ordenes desde aquí.
      </p>
      <div className="gap-4 grid md:grid-cols-2">
        {data?.map((order) => (
          <div key={order.id} className=" p-5 bg-white shadow space-y-2 h-fit">
            <p className=" text-xl font-bold text-slate-600">
              Orden #{order.id}
            </p>
            {order.products.map((product) => (
              <div
                key={product.id}
                className=" border-b border-b-slate-200 last-of-type:border-none py-4"
              >
                <p className=" text-sm">ID: {product.id}</p>
                <p className=" text-sm">Nombre: {product.name}</p>
                <p className=" text-sm">
                  Cantidad: {""}
                  <span className=" font-bold">{product.pivot.quantity}</span>
                </p>
                <p className=" text-sm">
                  Subtotal:{" "}
                  {formatAmount(product.price * product.pivot.quantity)}
                </p>
              </div>
            ))}
            <p className=" text-lg font-bold text-slate-600">
              Cliente: <span className=" font-normal">{order.user.name}</span>
            </p>
            <p className=" text-lg font-bold text-accent-light">
              Total:{" "}
              <span className=" font-normal">{formatAmount(order.total)}</span>
            </p>
            <button
              type="button"
              disabled={isLoadingComplete}
              onClick={() => hanldeClick(order.id)}
              className=" btn-base bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400  disabled:cursor-none disabled:opacity-70"
            >
              {isLoadingComplete ? "Completando" : "Completar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
