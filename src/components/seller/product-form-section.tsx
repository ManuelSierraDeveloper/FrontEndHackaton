"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import type { ProductFormData } from "@/types/producer-form";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_UNITS,
  DELIVERY_METHODS,
} from "@/types/producer-form";
import { useState, useCallback } from "react";

interface ProductFormSectionProps {
  products: ProductFormData[];
  errors: Record<string, string>;
  onUpdate: (index: number, updates: Partial<ProductFormData>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const addTag = useCallback(() => {
    const tag = input.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 10) {
      onChange([...tags, tag]);
      setInput("");
    }
  }, [input, tags, onChange]);

  const removeTag = useCallback(
    (tag: string) => {
      onChange(tags.filter((t) => t !== tag));
    },
    [tags, onChange]
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Etiquetas
      </label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#DEDB8D]/40 text-[#4A7010] text-xs font-medium rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-error"
              aria-label={`Eliminar etiqueta ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe y presiona Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addTag}
          disabled={!input.trim()}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}

function DeliveryMethodToggle({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (methods: string[]) => void;
}) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((m) => m !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Metodos de entrega
      </label>
      <div className="flex flex-wrap gap-2">
        {DELIVERY_METHODS.map((method) => (
          <button
            key={method.value}
            type="button"
            onClick={() => toggle(method.value)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
              ${selected.includes(method.value)
                ? "bg-[#6D9E13] text-white border-baloo-primary"
                : "bg-white text-gray-600 border-gray-300 hover:border-baloo-primary/50"
              }
            `}
          >
            {method.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SingleProductForm({
  product,
  index,
  errors,
  onUpdate,
  canRemove,
  onRemove,
}: {
  product: ProductFormData;
  index: number;
  errors: Record<string, string>;
  onUpdate: (updates: Partial<ProductFormData>) => void;
  canRemove: boolean;
  onRemove: () => void;
}) {
  const getError = (field: string) => errors[`product_${index}_${field}`];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gray-50/50 rounded-xl p-5 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading font-semibold text-gray-900">
          Producto {index + 1}
        </h4>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-error hover:text-error"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Eliminar
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre del producto"
            value={product.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Ej: Cafe organico Sierra Nevada"
            error={getError("name")}
            required
          />
          <Select
            label="Categoria"
            value={product.category}
            onChange={(e) => onUpdate({ category: e.target.value })}
            options={[{ value: "", label: "Seleccionar..." }, ...PRODUCT_CATEGORIES]}
            error={getError("category")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Descripcion
          </label>
          <textarea
            value={product.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe tu producto, su origen, caracteristicas..."
            rows={3}
            className={`
              w-full bg-white border rounded-lg px-4 py-3 text-base
              placeholder:text-gray-500 resize-none
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${getError("description")
                ? "border-error focus:border-error focus:ring-red-100"
                : "border-gray-300 focus:border-[#6D9E13] focus:ring-[#6D9E13]/10"
              }
            `}
          />
          {getError("description") && (
            <p className="mt-1.5 text-sm text-error">{getError("description")}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            label="Precio ($)"
            type="number"
            value={product.price}
            onChange={(e) => onUpdate({ price: e.target.value })}
            placeholder="0.00"
            min="0"
            step="0.01"
            error={getError("price")}
            required
          />
          <Input
            label="Descuento (%)"
            type="number"
            value={product.discount}
            onChange={(e) => onUpdate({ discount: e.target.value })}
            placeholder="0"
            min="0"
            max="100"
          />
          <Input
            label="Stock"
            type="number"
            value={product.stock}
            onChange={(e) => onUpdate({ stock: e.target.value })}
            placeholder="0"
            min="0"
            error={getError("stock")}
            required
          />
          <Select
            label="Unidad"
            value={product.unit}
            onChange={(e) => onUpdate({ unit: e.target.value })}
            options={[...PRODUCT_UNITS]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Peso (kg)"
            type="number"
            value={product.weight}
            onChange={(e) => onUpdate({ weight: e.target.value })}
            placeholder="Opcional"
            min="0"
            step="0.01"
          />
          <Input
            label="Dimensiones"
            value={product.dimensions}
            onChange={(e) => onUpdate({ dimensions: e.target.value })}
            placeholder="Ej: 30x20x10 cm"
          />
        </div>

        <TagInput
          tags={product.tags}
          onChange={(tags) => onUpdate({ tags })}
        />

        <DeliveryMethodToggle
          selected={product.deliveryMethods}
          onChange={(deliveryMethods) => onUpdate({ deliveryMethods })}
        />

        <ImageUploader
          maxFiles={5}
          onImagesChange={(files) => onUpdate({ imageFiles: files })}
          label="Imagenes del producto"
        />
      </div>
    </motion.div>
  );
}

export function ProductFormSection({
  products,
  errors,
  onUpdate,
  onAdd,
  onRemove,
}: ProductFormSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-xl text-gray-900">
            Tus productos
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Agrega al menos un producto para publicar en la tienda
          </p>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-1" />
          Agregar producto
        </Button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <SingleProductForm
            key={index}
            product={product}
            index={index}
            errors={errors}
            onUpdate={(updates) => onUpdate(index, updates)}
            canRemove={products.length > 1}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
