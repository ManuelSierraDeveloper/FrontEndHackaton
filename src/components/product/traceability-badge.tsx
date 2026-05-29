"use client";

import { User, MapPin, Leaf, Calendar, BadgeCheck } from "lucide-react";
import type { Product } from "@/types/product";
import { FARMING_METHOD_LABELS } from "@/types/product";

interface TraceabilityBadgeProps {
  product: Product;
  compact?: boolean;
}

export function TraceabilityBadge({ product, compact = false }: TraceabilityBadgeProps) {
  const { traceability } = product;
  const { producer } = traceability;

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#E8F5E9]/60 rounded-lg border border-[#A5D6A7]/30">
        <div className="w-5 h-5 bg-[#6D9E13]/10 rounded-full flex items-center justify-center shrink-0">
          <User className="w-3 h-3 text-[#6D9E13]" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-medium text-gray-700 truncate">
              {producer.name}
            </span>
            {producer.verified && (
              <BadgeCheck className="w-3 h-3 text-[#6D9E13] shrink-0" />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gradient-to-br from-[#E8F5E9]/40 to-[#E3F2FD]/30 rounded-xl border border-[#A5D6A7]/20 space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#6D9E13]/10 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-[#6D9E13]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-800 truncate">
              {producer.name}
            </span>
            {producer.verified && (
              <BadgeCheck className="w-3.5 h-3.5 text-[#6D9E13] shrink-0" />
            )}
          </div>
          <p className="text-[10px] text-gray-500">{producer.farm}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#6D9E13] shrink-0" />
          <span className="text-[10px] text-gray-600 truncate">{traceability.origin}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Leaf className="w-3 h-3 text-[#6D9E13] shrink-0" />
          <span className="text-[10px] text-gray-600 truncate">
            {FARMING_METHOD_LABELS[traceability.farmingMethod] || traceability.farmingMethod}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-[#6D9E13] shrink-0" />
          <span className="text-[10px] text-gray-600">{traceability.harvestDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400 font-mono">#{traceability.lotNumber}</span>
        </div>
      </div>
    </div>
  );
}
