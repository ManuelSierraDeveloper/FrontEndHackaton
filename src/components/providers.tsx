"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/hooks/useCart";
import { CartSidebar } from "@/components/product/cart-sidebar";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
    </CartProvider>
  );
}
