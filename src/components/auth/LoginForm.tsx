import InputField from "@/components/shared/InputField";
import { routes } from "@/data/routes";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { NavLink } from "react-router";

export const LoginForm = () => {
  const { login } = useAuth({
    middleware: "guest",
    url: routes.home,
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [validationErrors, setvalidationErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form, setvalidationErrors);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-md mx-auto mt-5 space-y-5"
      noValidate
    >
      <InputField
        label="Correo electrónico"
        id="email"
        name="email"
        type="email"
        autoFocus
        value={form.email}
        onChange={handleChange}
        error={validationErrors.email}
      />
      <InputField
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={validationErrors.password}
      />
      <div className="">
        <button
          type="submit"
          className=" bg-blue-700 text-white w-full px-4 py-2 rounded hover:bg-blue-800 transition-colors cursor-pointer font-semibold"
        >
          Iniciar sesión
        </button>
        <NavLink
          to={routes.auth.register}
          className=" hover:underline text-sm flex justify-center mt-3"
        >
          ¿Aún no tienes una cuenta?
        </NavLink>
      </div>
    </form>
  );
};
