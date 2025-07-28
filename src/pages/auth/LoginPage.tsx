import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className=" mx-2">
      <h1 className=" text-4xl font-black font-primary text-center">
        Inicia Sesión
      </h1>
      <LoginForm/>
    </div>
  );
}
