"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductImageGallery } from "./product-image-gallery";
import { ProductInfo } from "./product-info";
import { ProductActions } from "./product-actions";
import { RelatedProducts } from "./related-products";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import type { Product } from "@/types/product";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenRelated?: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  relatedProducts,
  onAddToCart,
  onOpenRelated,
}: ProductDetailModalProps) {
  const [mobileQuantity, setMobileQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setMobileQuantity(1);
    }
  }, [isOpen, product?.id]);

  if (!product) return null;

  const isOutOfStock = product.status === "agotado";

  const breadcrumbs = [
    { label: "Tienda", href: "/tienda" },
    { label: product.category },
    { label: product.name },
  ];

  const handleMobileAddToCart = () => {
    onAddToCart(product, mobileQuantity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle de ${product.name}`}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 bg-white w-full h-full md:h-auto md:max-h-[92vh] md:max-w-5xl md:rounded-2xl rounded-none shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 shrink-0 bg-white">
              <div className="hidden md:block">
                <Breadcrumbs items={breadcrumbs} />
              </div>
              <h2 className="md:hidden font-heading font-bold text-base text-gray-900 truncate flex-1 mr-4">
                {product.name}
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <ProductImageGallery images={product.images} productName={product.name} />
                  </div>

                  <div className="space-y-6">
                    <ProductInfo product={product} />
                    <ProductActions
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                </div>

                {relatedProducts.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <RelatedProducts
                      products={relatedProducts}
                      onOpenDetail={(p) => onOpenRelated?.(p)}
                      onAddToCart={(p) => onAddToCart(p, 1)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden shrink-0 border-t border-gray-100 bg-white p-4 space-y-3">
              {!isOutOfStock && (
                <div className="flex items-center justify-center">
                  <QuantitySelector
                    value={mobileQuantity}
                    onChange={setMobileQuantity}
                    max={product.stock}
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleMobileAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-3 px-4 text-sm font-semibold rounded-xl border border-[#6D9E13] text-[#6D9E13] hover:bg-[#E8F5E9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar al carrito
                </button>
                <button
                  disabled={isOutOfStock}
                  className="flex-1 py-3 px-4 text-sm font-semibold rounded-xl bg-[#6D9E13] text-white hover:bg-[#4A7010] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
