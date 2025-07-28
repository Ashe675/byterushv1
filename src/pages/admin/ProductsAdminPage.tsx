import useSWR from "swr";
import { ProductCardItem } from "@/components/product/ProductCardItem";
import { getProducts } from "@/services/ProductService";

export const ProductsAdminPage = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/products", getProducts, {
    refreshInterval: 10000,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error)
    return (
      <p className=" text-red-600 font-semibold p-2 rounded mx-2 text-center">
        {error.message}
      </p>
    );

  return (
    <div className="px-2 ">
      <h1 className="text-center font-primary text-3xl text-primary pt-8">
        Productos
      </h1>
      <p className="text-xl my-2 text-center">
        Maneja la disponibilidad de tus productos aquí.
      </p>
      <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data?.map((product) => (
          <ProductCardItem key={product.id} product={product} btnAvailable mutate={mutate} />
        ))}
      </div>
    </div>
  );
};
