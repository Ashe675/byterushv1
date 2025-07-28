
import type { ZodError } from "zod";

export const formatZodError = (error: ZodError): string => {
  const firstError = error.issues[0];
  return `${firstError.path.length > 0 ? `Error en ${firstError.path.join('.')}` : 'Respuesta Inesperada'} - ${firstError.message}`;
};