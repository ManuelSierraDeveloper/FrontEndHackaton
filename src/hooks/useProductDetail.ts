"use client";

import { useState, useCallback } from "react";
import type { Product } from "@/types/product";

export function useProductDetail() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openProductDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  }, []);

  const closeProductDetail = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  return {
    selectedProduct,
    isOpen,
    openProductDetail,
    closeProductDetail,
  };
}
