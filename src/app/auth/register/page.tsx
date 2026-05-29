import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">Crear Cuenta</h1>
        <p className="text-gray-600">Unete a la comunidad Nebbi</p>
      </div>
      <div className="card p-8">
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-white focus:border-[#6D9E13] focus:ring-2 focus:ring-[#6D9E13]/10 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electronico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-white focus:border-[#6D9E13] focus:ring-2 focus:ring-[#6D9E13]/10 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
            <input
              id="password"
              type="password"
              placeholder="Minimo 8 caracteres"
              className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-white focus:border-[#6D9E13] focus:ring-2 focus:ring-[#6D9E13]/10 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#6D9E13] text-white font-semibold rounded-lg hover:bg-[#4A7010] transition-colors"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-[#6D9E13] font-medium hover:underline">
            Inicia Sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
