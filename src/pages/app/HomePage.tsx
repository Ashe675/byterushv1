import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import { ProductCardItem } from "@/components/product/ProductCardItem";
import useQuiosco from "@/hooks/useQuiosco";
import { useMemo } from "react";
import { getProductsAvailables } from "@/services/ProductService";
import type { Product } from "@/types/products";

function HomePage() {
  const { currentCategory } = useQuiosco();

  const { data, error, isLoading } = useSWR(
    `/products/availables`,
    getProductsAvailables,
    {
      refreshInterval: 1000,
    }
  );

  const products = useMemo(() => {
    if (!currentCategory || !data) return [];
    return data.filter(
      (product: Product) => product.categoryId === currentCategory.id
    );
  }, [currentCategory, data]);

  if (!currentCategory) return null;

  if (isLoading) {
    return "Cargando...";
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        <p>⚠️ {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <h1 className="text-center font-primary text-3xl text-primary py-8">
        {currentCategory.name}
      </h1>

      <div className="p-3 grid gap-4 grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {products.length === 0 ? (
            <motion.p
              key="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No hay productos en esta categoría
            </motion.p>
          ) : (
            products.map((product) => (
              <ProductCardItem key={product.id} product={product} btnAdd />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HomePage;
