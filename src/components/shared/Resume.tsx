import useQuiosco from "@/hooks/useQuiosco";
import { OrderResume } from "../order/OrderResume";
import { formatAmount } from "@/utils";
import { useMemo } from "react";

export default function Resume() {
  const { order, handleSubmitNewOrder } = useQuiosco();
  const total = useMemo(
    () => order.reduce((acc, order) => acc + order.price * order.quantity, 0),
    [order]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitNewOrder();
  };

  return (
    <aside
      id="resume"
      className=" md:w-72 h-dvh overflow-y-auto p-5 pt-8 bg-white"
    >
      <h1 className=" text-3xl font-primary text-primary font-black">
        Mi Pedido
      </h1>
      <p className=" text-lg my-5">Resumen y total de tu pedido.</p>
      <div className="py-10">
        {order.length === 0 ? (
          <p className=" text-center">No hay productos en tu pedido.</p>
        ) : (
          order.map((order) => (
            <OrderResume key={order.productId} order={order} />
          ))
        )}
      </div>
      <p className=" text-xl mt-10">Total: {formatAmount(total)}</p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-5">
          <button
            type="submit"
            disabled={total === 0}
            className=" btn-base bg-accent-light hover:bg-accent-light-dark disabled:bg-gray-400  disabled:cursor-none disabled:opacity-70"
          >
            {"Confirmar pedido"}
          </button>
        </div>
      </form>
    </aside>
  );
}
