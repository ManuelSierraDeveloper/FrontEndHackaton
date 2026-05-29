"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function CartSidebar() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#6D9E13]" />
                <h2 className="font-heading font-bold text-lg text-gray-900">
                  Tu carrito
                </h2>
                {cartCount > 0 && (
                  <span className="bg-[#6D9E13]/10 text-[#6D9E13] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {cartCount} {cartCount === 1 ? "producto" : "productos"}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="font-heading font-bold text-gray-800 mb-1">Tu carrito esta vacio</p>
                  <p className="text-sm text-gray-400 mb-6">
                    Agrega productos frescos del Magdalena
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 bg-[#6D9E13] text-white text-sm font-semibold rounded-lg hover:bg-[#4A7010] transition-colors"
                  >
                    Explorar productos
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        <Image
                          src={item.product.images[0] || "/nebbi.png"}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">{item.product.unit}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:border-[#6D9E13] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                              aria-label="Disminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium text-gray-800 w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:border-[#6D9E13] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              ${(item.product.price * item.quantity).toLocaleString("es-CO")}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-[#F44336] hover:bg-[#FFEBEE] transition-colors"
                              aria-label="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="shrink-0 border-t border-gray-100 px-6 py-4 bg-white space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-800">
                      ${cartTotal.toLocaleString("es-CO")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Envio</span>
                    <span className="text-[#6D9E13] font-medium">Gratis</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-heading font-bold text-xl text-gray-900">
                      ${cartTotal.toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-[#6D9E13] text-white font-semibold rounded-xl hover:bg-[#4A7010] transition-colors flex items-center justify-center gap-2">
                  Ir a pagar
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-sm text-gray-500 font-medium hover:text-[#6D9E13] transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
