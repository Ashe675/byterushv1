import {z} from "zod";

export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export type LoginFormData = Pick<RegisterFormData, 'email' | 'password'>;

export const AuthSchema = z.object({
    token: z.string(),
    message: z.string(),
});

export type AuthResponse = z.infer<typeof AuthSchema> 

export const GetUserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    admin: z.number().transform((val) => val === 1),
});

export type GetUserResponse = z.infer<typeof GetUserSchema>;