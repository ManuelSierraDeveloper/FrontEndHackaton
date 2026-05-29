"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { href: "/tienda", label: "Tienda" },
  { href: "/mapa", label: "Mapa" },
  { href: "/productores", label: "Productores" },
  { href: "/experiencias", label: "Experiencias" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-[#6D9E13] sticky top-0 z-40 shadow-md">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/nebbi.png"
            alt="Nebbi Logo"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-heading font-bold text-lg text-[#FFFAF3] leading-tight">
              Nebbi
            </span>
            <span className="text-[10px] text-[#DEDB8D] tracking-wider leading-tight">
              SABOR CARIBE, FLOW DIGITAL
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = mounted && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#FFFAF3]/15 text-[#FFFAF3]"
                    : "text-[#FFFAF3]/80 hover:text-[#FFFAF3] hover:bg-[#FFFAF3]/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2 text-[#FFFAF3] rounded-lg hover:bg-[#FFFAF3]/10 transition-colors"
            aria-label={`Carrito${cartCount > 0 ? ` (${cartCount} productos)` : ""}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFFAF3] text-[#4A7010] text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <Link
            href="/tienda"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-[#FFFAF3] border border-[#FFFAF3]/30 rounded-lg hover:bg-[#FFFAF3]/10 transition-colors"
          >
            Iniciar Sesion
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-[#4A7010] bg-[#FFFAF3] rounded-lg hover:bg-[#DEDB8D] transition-colors shadow-sm"
          >
            Registrarse
          </Link>

          <button
            className="md:hidden p-2 text-[#FFFAF3] rounded-lg hover:bg-[#FFFAF3]/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#4A7010] border-t border-[#FFFAF3]/10">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = mounted && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#FFFAF3]/15 text-[#FFFAF3]"
                      : "text-[#FFFAF3]/80 hover:text-[#FFFAF3] hover:bg-[#FFFAF3]/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-[#FFFAF3]/10 mt-2 pt-3">
              <Link
                href="/tienda"
                className="block px-3 py-3 text-sm font-medium text-[#FFFAF3]/80 hover:text-[#FFFAF3] hover:bg-[#FFFAF3]/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesion
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
