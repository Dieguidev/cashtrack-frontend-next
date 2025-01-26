
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashTracker - Iniciar sesión",
  description: "CashTracker - Iniciar sesión",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Iniciar sesión</h1>
      <p className="text-3xl font-bold">y controla tu <span className="text-amber-500">fnanzas</span></p>

      <LoginForm />
    </>
  );
}
