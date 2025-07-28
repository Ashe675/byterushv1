import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { routes } from "@/data/routes";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export const AdminLayout = () => {
  const { user } = useAuth({
    middleware: "admin",
  });
  
  if (!user || !user.admin) return <Navigate to={routes.home} replace />;

  return (
    <>
      <div className=" md:flex min-h-dvh">
        <AdminSidebar />
        <main className=" flex-1 overflow-y-auto md:max-h-dvh">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </>
  );
};
