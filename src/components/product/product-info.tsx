"use client";

import { Star, Package, MapPin, Shield } from "lucide-react";
import type { Product } from "@/types/product";
import { CERTIFICATION_CONFIG, STATUS_CONFIG } from "@/types/product";
import { ProducerCard } from "./producer-card";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const statusConfig = STATUS_CONFIG[product.status];
  const isOutOfStock = product.status === "agotado";
  const stockLevel = product.stock > 10 ? "high" : product.stock > 3 ? "medium" : "low";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {product.certifications.map((cert) => {
          const config = CERTIFICATION_CONFIG[cert];
          return (
            <span
              key={cert}
              className="text-xs px-2 py-1 rounded-full font-medium border"
              style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
            >
              <Shield className="w-3 h-3 inline mr-1" />
              {config.label}
            </span>
          );
        })}
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
        >
          {statusConfig.label}
        </span>
      </div>

      <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
        {product.name}
      </h1>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
        <span className="text-sm text-gray-400">({product.reviews} valoraciones)</span>
        <span className="text-sm text-gray-300">|</span>
        <span className="text-sm text-gray-500">{product.sales} ventas</span>
      </div>

      <div className="flex items-baseline gap-3 flex-wrap">
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-lg text-gray-400 line-through">
            ${product.originalPrice.toLocaleString("es-CO")}
          </span>
        )}
        <span className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
          ${product.price.toLocaleString("es-CO")}
        </span>
        {product.discount != null && product.discount > 0 && (
          <span className="bg-[#6D9E13]/10 text-[#6D9E13] text-sm font-semibold px-2 py-0.5 rounded-full">
            -{product.discount}% OFF
          </span>
        )}
      </div>

      <p className="text-[13px] text-gray-400 -mt-1">{product.unit}</p>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 text-[#6D9E13]" />
        <span>{product.location}</span>
      </div>

      <ProducerCard product={product} />

      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Descripcion</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Package className={`w-5 h-5 ${stockLevel === "low" ? "text-[#F44336]" : "text-[#6D9E13]"}`} />
        <div>
          <p className={`text-sm font-medium ${isOutOfStock ? "text-[#F44336]" : "text-gray-800"}`}>
            {isOutOfStock ? "Producto agotado" : `${product.stock} unidades disponibles`}
          </p>
          {!isOutOfStock && stockLevel === "low" && (
            <p className="text-xs text-[#F44336]">¡Ultimas unidades!</p>
          )}
        </div>
      </div>
    </div>
  );
}
