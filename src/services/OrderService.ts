import api from "@/config/axios";
import type { Order } from "@/types/order";
import { GetOrdersSchema } from "@/types/order";
import { handleApiErrorResponse } from "@/utils/handle-errors";
import { formatZodError } from "@/utils/zod";

export const createOrder = async (order: Order[]): Promise<string | undefined> => {
    try {
        const { data } = await api.post<{ message: string }>('/orders', {
            order: order.map(item => ({
                product_id: item.productId,
                quantity: item.quantity,
            }))
        });

        if (!data) {
            throw new Error("No data returned from the API");
        }

        return data.message;
    } catch (error) {
        handleApiErrorResponse(error);
    }
}

export const getOrders = async () => {
    try {
        const { data } = await api.get('/orders');

        if (!data) {
            throw new Error("No data returned from the API");
        }
        const parsed = GetOrdersSchema.safeParse(data);

        if (!parsed.success) {
            const errorMessage = formatZodError(parsed.error);
            throw new Error(errorMessage);
        }

        return parsed.data.data;
    } catch (error) {
        handleApiErrorResponse(error);
    }
};

export const completeOrder = async (orderId: number) => {
    try {
        const { data } = await api.put<{ message: string }>(`/orders/${orderId}`);
        return data.message;
    } catch (error) {
        handleApiErrorResponse(error);
    }
}