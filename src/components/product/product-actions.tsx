"use client";

import { useState } from "react";
import { ShoppingCart, Zap, CreditCard, Truck, Banknote, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import type { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
}

const paymentIcons: Record<string, React.ReactNode> = {
  tarjeta: <CreditCard className="w-4 h-4" />,
  pse: <Banknote className="w-4 h-4" />,
  nequi: <Smartphone className="w-4 h-4" />,
  efectivo: <Banknote className="w-4 h-4" />,
};

export function ProductActions({ product, onAddToCart, onBuyNow }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.status === "agotado";

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      {!isOutOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Cantidad:</span>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={product.stock}
          />
          <span className="text-xs text-gray-400">
            {product.stock > 10 ? "Stock disponible" : `Solo ${product.stock} disponibles`}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          isLoading={added}
        >
          {!added && <ShoppingCart className="w-5 h-5 mr-2" />}
          {added ? "Agregado!" : "Agregar al carrito"}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={() => onBuyNow?.(product, quantity)}
          disabled={isOutOfStock}
        >
          <Zap className="w-5 h-5 mr-2" />
          Comprar ahora
        </Button>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Truck className={`w-5 h-5 ${product.shipping.free ? "text-[#6D9E13]" : "text-gray-400"}`} />
          <div>
            <p className="text-sm font-medium text-gray-800">
              {product.shipping.free ? "Envio gratis" : `Envio: $${product.shipping.cost.toLocaleString("es-CO")}`}
            </p>
            <p className="text-xs text-gray-500">
              {product.shipping.available
                ? `Llega en ${product.shipping.estimatedDays}`
                : "No disponible para tu zona"}
            </p>
          </div>
        </div>

        {product.shipping.free && (
          <div className="flex items-center gap-2 text-xs text-[#6D9E13] bg-[#6D9E13]/5 px-3 py-2 rounded-lg">
            <Truck className="w-3.5 h-3.5" />
            <span className="font-medium">Envio gratis a todo el Magdalena</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Medios de pago:</p>
        <div className="flex flex-wrap gap-2">
          {product.paymentMethods.map((method) => (
            <div
              key={method.name}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600"
            >
              {paymentIcons[method.icon] || <CreditCard className="w-4 h-4" />}
              <span>{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
