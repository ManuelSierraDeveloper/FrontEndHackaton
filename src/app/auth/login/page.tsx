"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      // if login returned success, redirect to tienda
      setLoading(false);
      router.push("/tienda");
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">Iniciar Sesion</h1>
        <p className="text-gray-600">Accede a tu cuenta de Nebbi</p>
      </div>
      <div className="card p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electronico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-white focus:border-[#6D9E13] focus:ring-2 focus:ring-[#6D9E13]/10 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-white focus:border-[#6D9E13] focus:ring-2 focus:ring-[#6D9E13]/10 outline-none transition-colors"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#6D9E13] text-white font-semibold rounded-lg hover:bg-[#4A7010] transition-colors disabled:opacity-60"
          >
            {loading ? "Iniciando..." : "Iniciar Sesion"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-[#6D9E13] font-medium hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
