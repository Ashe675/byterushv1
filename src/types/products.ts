import { z } from 'zod';

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    categoryId: z.number(),
    price: z.number(),
    available : z.number().transform((val) => val === 1),
});

export const productListSchema = z.object({
    data: z.array(productSchema)
});

export type Product = z.infer<typeof productSchema>