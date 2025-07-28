import z from "zod"
import type { Product } from "./products"
import { GetUserSchema } from "./auth"

export type Order = Pick<Product, 'name' | 'price'> & {
    productId: number,
    quantity: number
}

export const GetOrdersSchema = z.object({
    data: z.array(z.object({
        id: z.number(),
        status: z.number(),
        total: z.number(),
        user: GetUserSchema,
        products: z.array(z.object({
            id: z.number(),
            name: z.string(),
            image: z.string(),
            category_id: z.number(),
            price: z.number(),
            pivot: z.object({
                quantity: z.number(),
                price: z.string().transform(parseFloat),
            })
        }))
    }))

})