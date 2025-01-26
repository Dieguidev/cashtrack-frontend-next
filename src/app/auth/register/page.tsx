import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashTracker - Crear Cuenta",
  description: "CashTracker - Crear Cuenta",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Crear una cuenta</h1>
      <p className="text-3xl font-bold">y controla tu <span className="text-amber-500">fnanzas</span></p>

      <RegisterForm />
    </>
  );
}
