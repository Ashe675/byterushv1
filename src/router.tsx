import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/app/HomePage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthGuard } from "./guards/AuthGuard";
import { AdminLayout } from "./layouts/AdminLayout";
import { OrdersAdminPage } from "./pages/admin/OrdersAdminPage";
import { ProductsAdminPage } from "./pages/admin/ProductsAdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} index />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<OrdersAdminPage />} />
            <Route path="products" element={<ProductsAdminPage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
