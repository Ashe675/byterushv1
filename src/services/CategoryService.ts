import api from "@/config/axios";
import { categoriesSchema } from "@/types/categories";
import { handleApiErrorResponse } from "@/utils/handle-errors";

export async function getCategories() {
    try {
        const url = '/categories'
        const {data} = await api.get(url)
        const response = categoriesSchema.safeParse(data);
        if(response.success){
            return response.data.data
        }else{
            throw new Error("Respuesta inesperada");
        }
    } catch (error) {
       handleApiErrorResponse(error);
    }
}