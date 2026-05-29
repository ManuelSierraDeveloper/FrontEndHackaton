"use client";

import { HTMLAttributes, forwardRef } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "fairtrade" | "rainforest" | "organic";
type BadgeStatus = "activo" | "pendiente" | "vencido";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  status?: BadgeStatus;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 border-gray-300",
  success: "bg-[#DEDB8D] text-[#4A7010]",
  warning: "bg-[#FFF8E1] text-[#F57F17]",
  error: "bg-[#FFEBEE] text-[#C62828]",
  info: "bg-[#E3F2FD] text-[#1565C0]",
  fairtrade: "bg-[#FFF3E0] text-[#E65100] border-[#FFCC80]",
  rainforest: "bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]",
  organic: "bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]",
};

const statusStyles: Record<BadgeStatus, string> = {
  activo: "bg-[#DEDB8D] text-[#4A7010]",
  pendiente: "bg-[#FFF8E1] text-[#F57F17]",
  vencido: "bg-[#FFEBEE] text-[#C62828]",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", status, children, ...props }, ref) => {
    const styles = status ? statusStyles[status] : variantStyles[variant];

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center px-2 py-1 text-xs font-medium rounded
          border
          ${styles}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps, BadgeVariant, BadgeStatus };