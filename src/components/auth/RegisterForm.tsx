import { useState } from "react";
import InputField from "@/components/shared/InputField";
import { routes } from "@/data/routes";
import { NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export const RegisterForm = () => {
  const { register } = useAuth({
    middleware: "guest",
    url: routes.home,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [validationErrors, setvalidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(form, setvalidationErrors);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-md mx-auto mt-5 space-y-5"
      noValidate
    >
      <InputField
        label="Nombre completo"
        id="name"
        name="name"
        autoFocus
        value={form.name}
        onChange={handleChange}
        error={validationErrors.name}
      />

      <InputField
        label="Correo electrónico"
        id="email"
        name="email"
        type="email"
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

      <InputField
        label="Confirmar contraseña"
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        value={form.password_confirmation}
        onChange={handleChange}
      />
      <div className="">
        <button
          type="submit"
          className=" bg-blue-700 text-white w-full px-4 py-2 rounded hover:bg-blue-800 transition-colors cursor-pointer font-semibold"
        >
          Crear cuenta
        </button>
        <NavLink
          to={routes.auth.login}
          className="  hover:underline text-sm flex justify-center mt-3"
        >
          ¿Ya tienes una cuenta?
        </NavLink>
      </div>
    </form>
  );
};
