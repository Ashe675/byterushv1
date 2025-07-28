import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import ProductModal from "@/components/product/ProductModal";
import { Modal } from "@/components/shared/Modal";
import Resume from "@/components/shared/Resume";
import { Sidebar } from "@/components/shared/Sidebar";
import useQuiosco from "@/hooks/useQuiosco";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/data/routes";

export default function AppLayout() {
  const { modal, handleClickModal, handleSetProduct } = useQuiosco();
  const { user } = useAuth({});

  if (user && user.admin) return <Navigate to={routes.admin.orders} replace />;

  const handleClick = () => {
    handleClickModal();
    handleSetProduct(null);
  };

  return (
    <>
      <div className=" md:flex min-h-dvh">
        <Sidebar />
        <main className=" flex-1 overflow-y-auto md:max-h-dvh">
          <Outlet />
        </main>
        <Resume />
      </div>

      <Modal isOpen={modal} close={handleClick}>
        <ProductModal />
      </Modal>

      <ToastContainer />
    </>
  );
}
