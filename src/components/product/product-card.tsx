"use client";

import Image from "next/image";
import { Star, MapPin, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product, CertificationType } from "@/types/product";
import { CERTIFICATION_CONFIG } from "@/types/product";
import { TraceabilityBadge } from "./traceability-badge";

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  index?: number;
}

function CertificationTag({ cert }: { cert: CertificationType }) {
  const config = CERTIFICATION_CONFIG[cert];
  if (!config) return null;
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded font-medium border"
      style={{ backgroundColor: config.bg, color: config.text, borderColor: config.bg }}
    >
      {config.label}
    </span>
  );
}

export function ProductCard({ product, onOpenDetail, onAddToCart, index = 0 }: ProductCardProps) {
  const isOutOfStock = product.status === "agotado";
  const formattedPrice = `$${product.price.toLocaleString("es-CO")}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#6D9E13]/30 transition-all relative"
    >
      <button
        onClick={() => onOpenDetail(product)}
        className="block w-full text-left"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <div className="relative aspect-square bg-gradient-to-br from-[#DEDB8D]/30 to-[#E3F2FD]/30 p-6 flex items-center justify-center">
          <Image
            src={product.images[0] || "/nebbi.png"}
            alt={product.name}
            width={160}
            height={160}
            className={`object-contain group-hover:scale-105 transition-transform duration-300 ${isOutOfStock ? "opacity-50" : ""}`}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isOutOfStock ? (
              <span className="bg-gray-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit">
                Agotado
              </span>
            ) : product.badge ? (
              <span className="bg-[#6D9E13] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit">
                {product.badge}
              </span>
            ) : null}
          </div>

          <div className="absolute top-3 right-3 flex gap-1.5">
            {product.discount != null && product.discount > 0 && !isOutOfStock && (
              <span className="bg-[#F44336] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
            <span className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="w-4 h-4 text-gray-400" />
            </span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex gap-1 flex-wrap">
            {product.certifications.map((cert) => (
              <CertificationTag key={cert} cert={cert} />
            ))}
          </div>

          <TraceabilityBadge product={product} compact />

          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.sales})</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-xs text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString("es-CO")}
                </p>
              )}
              <p className="text-lg font-heading font-bold text-gray-900">{formattedPrice}</p>
              <p className="text-[11px] text-gray-400">{product.unit}</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[80px]">{product.location}</span>
            </div>
          </div>
        </div>
      </button>

      {onAddToCart && !isOutOfStock && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 w-9 h-9 bg-[#6D9E13] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#4A7010] transition-all shadow-md"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      )}
    </motion.article>
  );
}
