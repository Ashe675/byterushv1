import api from "@/config/axios";
import { productListSchema, type Product } from "@/types/products";
import { handleApiErrorResponse } from "@/utils/handle-errors";
import { formatZodError } from "@/utils/zod";

export const getProductsAvailables = async (): Promise<Product[] | undefined> => {
  try {
    const response = await api.get('/products/availables');
    
    const parsed = productListSchema.safeParse(response.data);

    if (!parsed.success) {
      const errorMessage = formatZodError(parsed.error);
      throw new Error(errorMessage);
    }

    return parsed.data.data;
  } catch (error) {
    handleApiErrorResponse(error);
  }
};

export const getProducts = async (): Promise<Product[] | undefined> => {
  try {
    const response = await api.get('/products');
    
    const parsed = productListSchema.safeParse(response.data);

    if (!parsed.success) {
      const errorMessage = formatZodError(parsed.error);
      throw new Error(errorMessage);
    }

    return parsed.data.data;
  } catch (error) {
    handleApiErrorResponse(error);
  }
};


export const availableProduct = async (productId: number) => {
    try {
        const { data } = await api.put<{ message: string }>(`/products/${productId}`);
        return data.message;
    } catch (error) {
        handleApiErrorResponse(error);
    }
}