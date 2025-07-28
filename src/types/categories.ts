import { z } from 'zod';

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string()
})

export const categoriesSchema = z.object({
    data: z.array(categorySchema)
});

export type Category = z.infer<typeof categorySchema>