import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/data/routes";

export const AuthGuard = () => {
  const { user, userLoading } = useAuth({
    middleware: "auth"
  });

  if (userLoading) return 'Loading...';

  if(!user) return <Navigate to={routes.auth.login} replace />;

  return <Outlet />;
};
