import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import type { Category } from "@/types/categories";
import type { Product } from "@/types/products";
import type { Order } from "@/types/order";
import { products } from "@/data/products";
import { getCategories } from "@/services/CategoryService";
import { completeOrder, createOrder } from "@/services/OrderService";
import { availableProduct } from "@/services/ProductService";

type QuioscoContextProps = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  currentCategory: Category | null;
  setCurrentCategory: (category: Category) => void;
  handleClickCategory: (category: Category) => void;
  modal: boolean;
  handleClickModal: () => void;
  product: Product | null;
  handleSetProduct: (product: Product | null) => void;
  order: Order[];
  setOrder: (order: Order[]) => void;
  handleAddOrder: (order: Order) => void;
  handleEditOrder: (id: number) => void;
  handleDeleteOrder: (id: number) => void;
  handleSubmitNewOrder: () => Promise<void>;
  handleClickCompleteOrder: (orderId: number) => Promise<void>;
  handleClickProductAvailable: (productId: number) => Promise<void>;
};

const QuioscoContext = createContext<QuioscoContextProps>(null!);

type QuioscoProviderProps = {
  children: ReactNode;
};

const QuioscoProvider = ({ children }: QuioscoProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  const initialOrder: Order[] = JSON.parse(
    localStorage.getItem("order") || "[]"
  );

  const [order, setOrder] = useState<Order[]>(initialOrder);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  useEffect(() => {
    getCategories().then((data) => {
      if (data) {
        setCategories(data);
        setCurrentCategory(data[0]);
      }
    });
  }, []);

  const handleClickCategory = (category: Category) => {
    setCurrentCategory(category);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleSetProduct = (product: Product | null) => {
    setProduct(product);
  };

  const handleAddOrder = (newOrder: Order) => {
    const productInOrder = order.find(
      (item) => item.productId === newOrder.productId
    );
    if (productInOrder) {
      const updatedOrder = order.map((item) => {
        if (item.productId === newOrder.productId) {
          return { ...item, quantity: newOrder.quantity };
        }
        return item;
      });
      setOrder(updatedOrder);
      toast.success("Producto actualizado en el pedido");
    } else {
      setOrder([...order, newOrder]);
      toast.success("Producto agregado al pedido");
    }
  };

  const handleEditOrder = (id: number) => {
    const orderToEdit = order.find((item) => item.productId === id);
    if (!orderToEdit) return;
    const productToEdit = products.find((item) => item.id === id);
    if (!productToEdit) return;
    handleSetProduct(productToEdit);
    setModal(true);
  };

  const handleDeleteOrder = (id: number) => {
    const newOrder = order.filter((item) => item.productId !== id);
    setOrder(newOrder);
    toast.success("Producto eliminado del pedido");
  };

  const handleSubmitNewOrder = async () => {
    try {
      const message = await createOrder(order);
      toast.success(message || "Pedido confirmado");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setOrder([]);
    }
  };

  const handleClickCompleteOrder = async (orderId: number) => {
    try {
      const message = await completeOrder(orderId);
      toast.success(message || "Pedido completado");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleClickProductAvailable = async (productId: number) => {
    try {
      const message = await availableProduct(productId);
      toast.success(message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        setCategories,
        currentCategory,
        setCurrentCategory,
        handleClickCategory,
        modal,
        handleClickModal,
        product,
        handleSetProduct,
        order,
        setOrder,
        handleAddOrder,
        handleEditOrder,
        handleDeleteOrder,
        handleSubmitNewOrder,
        handleClickCompleteOrder,
        handleClickProductAvailable,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
