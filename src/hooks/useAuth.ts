import useSWR from "swr";
import { getUser, loginUser, logoutUser, registerUser } from "@/services/AuthService";
import type { LoginFormData, RegisterFormData } from "@/types/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { routes } from "@/data/routes";

export const useAuth = ({ middleware, url }: { middleware?: string, url?: string }) => {
    const navigate = useNavigate();
    const { data: user, error, mutate,  isLoading : userLoading } = useSWR('/api/user', getUser);

    const login = async (form: LoginFormData, setValidationErrors: React.Dispatch<React.SetStateAction<{ email: string; password: string; }>>) => {

        setValidationErrors({
            email: "",
            password: "",
        });

        try {
            await loginUser(form);
            await mutate();
        } catch (error) {
            if (error instanceof Error) {
                if (error.cause) {
                    const apiError = error.cause as {
                        validationErrors: Record<string, string>;
                    };
                    if (apiError.validationErrors) {
                        setValidationErrors({
                            email: apiError.validationErrors.email ?? "",
                            password: apiError.validationErrors.password ?? "",
                        });
                    } else {
                        console.error("Unexpected error format", apiError);
                    }
                    return;
                }
                const errorMessage = error.message || "An unexpected error occurred";
                setValidationErrors({
                    email: errorMessage,
                    password: "",
                });
            } else {
                console.error("An unknown error occurred");
            }
        }
    }

    const register = async (form: RegisterFormData, setvalidationErrors: React.Dispatch<React.SetStateAction<{ name: string; email: string; password: string; }>>) => {
        setvalidationErrors({
            name: "",
            email: "",
            password: "",
        });
        try {
            await registerUser(form);
            await mutate();
        } catch (error) {
            if (error instanceof Error) {

                if (error.cause) {
                    const apiError = error.cause as {
                        validationErrors: Record<string, string>;
                    };
                    if (apiError.validationErrors) {
                        setvalidationErrors({
                            name: apiError.validationErrors.name ?? "",
                            email: apiError.validationErrors.email ?? "",
                            password: apiError.validationErrors.password ?? "",
                        });
                    } else {
                        console.error("Unexpected error format", apiError);
                    }
                    return;
                }
                const errorMessage = error.message || "An unexpected error occurred";
                setvalidationErrors({
                    name: errorMessage,
                    email: "",
                    password: "",
                });
            } else {
                console.error("An unknown error occurred");
            }
        }
    }

    const logout = async () => {
        if (!user) return;
        try {
            await logoutUser();
            await mutate(undefined);
            
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }


    useEffect(() => {
        if (middleware === "guest" && user && !error && url) {
            navigate(url, { replace: true });
        }

        if (middleware === "guest" && user && !error && user.admin) {
            navigate(routes.admin.orders, { replace: true });
        }

        if (middleware === "admin" && user && !error && !user.admin) {
            navigate(routes.home, { replace: true });
        }

        if (middleware === "auth" && error) {
            navigate(routes.auth.login, { replace: true });
        }

    }, [user, middleware, url, navigate, error]);


    return {
        login,
        register,
        logout,
        user,
        error,
        userLoading,
    };
}