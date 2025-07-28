import { RegisterForm } from "@/components/auth/RegisterForm";


export default function RegisterPage() {
  
  return (
    <div className=" mx-2">
      <h1 className=" text-4xl font-black font-primary text-center">
        Crea tu Cuenta
      </h1>
      <RegisterForm/>
    </div>
  );
}
