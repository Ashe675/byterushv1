import { isAxiosError } from "axios";
import type { ApiValidationError } from "@/types/errors";

export const handleApiErrorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.error || error.response?.data?.message || error.message;

    if (error.response?.status === 422) {
      const errors: ApiValidationError['errors'] = error.response.data.errors;
      if (errors) {
        const validationErrors: Record<string, string> = {};
        Object.entries(errors).forEach(([field, messages]) => {
          validationErrors[field] = messages[0];
        });

        throw new Error(`Validation Error`, {
          cause: {
            validationErrors,
          },
        });
      }
    }

    
    throw new Error(message || 'No se pudo conectar con el servidor');
  }

  throw new Error('Ocurrió un error inesperado');
}