import api from "@/config/axios";
import { AuthSchema, GetUserSchema, type AuthResponse, type GetUserResponse, type LoginFormData, type RegisterFormData } from "@/types/auth";
import { handleApiErrorResponse } from "@/utils/handle-errors";
import { formatZodError } from "@/utils/zod";


export const registerUser = async (formData: RegisterFormData): Promise<string | undefined> => {
  try {
    const { data } = await api.post<AuthResponse>('/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    });

    if (!data) {
      throw new Error("No data returned from the API");
    }

    const parsed = AuthSchema.safeParse(data);

    if (!parsed.success) {
      const errorMessage = formatZodError(parsed.error);
      throw new Error(errorMessage);
    }

    localStorage.setItem('AUTH_TOKEN', parsed.data.token);

    return data.message;
  } catch (error) {
    handleApiErrorResponse(error);
  }
};


export const loginUser = async (formData: LoginFormData): Promise<string | undefined> => {
  try {
    const { data } = await api.post<AuthResponse>('/login', {
      email: formData.email,
      password: formData.password,
    });

    if (!data) {
      throw new Error("No data returned from the API");
    }

    const parsed = AuthSchema.safeParse(data);

    if (!parsed.success) {
      const errorMessage = formatZodError(parsed.error);
      throw new Error(errorMessage);
    }

    localStorage.setItem('AUTH_TOKEN', parsed.data.token);

    return parsed.data.message;
  } catch (error) {
    handleApiErrorResponse(error);
  }
}

export const getUser = async (): Promise<GetUserResponse | undefined> => {
  try {
    const { data } = await api.get<GetUserResponse>('/user');

    if (!data) {
      throw new Error("No data returned from the API");
    }
    
    const parsed = GetUserSchema.safeParse(data);
    if (!parsed.success) {
      const errorMessage = formatZodError(parsed.error);
      throw new Error(errorMessage);
    }
    
    return parsed.data;
  } catch (error) {
    handleApiErrorResponse(error);
  }

}

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/logout');
    localStorage.removeItem('AUTH_TOKEN');
  } catch (error) {
    handleApiErrorResponse(error);
  }
}