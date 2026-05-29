"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function RelatedProducts({ products, onOpenDetail, onAddToCart }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg text-gray-900">Productos relacionados</h3>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#6D9E13] hover:text-[#6D9E13] transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#6D9E13] hover:text-[#6D9E13] transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-[220px] shrink-0 snap-start">
            <ProductCard
              product={product}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
