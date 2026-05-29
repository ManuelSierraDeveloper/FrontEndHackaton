"use client";

import { User, MapPin, Leaf, Calendar, BadgeCheck, Shield, FileText } from "lucide-react";
import type { Product } from "@/types/product";
import { FARMING_METHOD_LABELS } from "@/types/product";

interface ProducerCardProps {
  product: Product;
}

export function ProducerCard({ product }: ProducerCardProps) {
  const { traceability } = product;
  const { producer } = traceability;

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#6D9E13]/5 to-[#E3F2FD]/30 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#6D9E13]" />
          <h3 className="text-sm font-semibold text-gray-800">Trazabilidad del producto</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-[#6D9E13]/10 rounded-full flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-[#6D9E13]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-semibold text-gray-900">{producer.name}</h4>
              {producer.verified && (
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-[#6D9E13] bg-[#6D9E13]/10 px-1.5 py-0.5 rounded-full">
                  <BadgeCheck className="w-3 h-3" />
                  Verificado
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{producer.farm}</p>
            <p className="text-xs text-gray-400 mt-0.5">Miembro desde {producer.memberSince}</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">{producer.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg">
            <MapPin className="w-4 h-4 text-[#6D9E13] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Origen</p>
              <p className="text-xs font-medium text-gray-700">{traceability.origin}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg">
            <Leaf className="w-4 h-4 text-[#6D9E13] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Metodo</p>
              <p className="text-xs font-medium text-gray-700">
                {FARMING_METHOD_LABELS[traceability.farmingMethod] || traceability.farmingMethod}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-[#6D9E13] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Cosecha</p>
              <p className="text-xs font-medium text-gray-700">{traceability.harvestDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg">
            <Shield className="w-4 h-4 text-[#6D9E13] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Lote</p>
              <p className="text-xs font-medium text-gray-700 font-mono">#{traceability.lotNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
