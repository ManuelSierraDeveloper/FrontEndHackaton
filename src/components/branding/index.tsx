"use client";

import { ReactElement } from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function NebbiLogo({ size = 40, showText = true, ...props }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="32" cy="32" r="28" fill="#6D9E13" />
        <circle cx="32" cy="32" r="20" fill="#4A7010" />
        <circle cx="24" cy="28" r="6" fill="#6D9E13" />
        <circle cx="40" cy="28" r="6" fill="#6D9E13" />
        <circle cx="25" cy="27" r="3" fill="#1565C0" />
        <circle cx="41" cy="27" r="3" fill="#1565C0" />
        <circle cx="26" cy="26" r="1.5" fill="#FFC107" />
        <circle cx="42" cy="26" r="1.5" fill="#FFC107" />
        <ellipse cx="32" cy="38" rx="8" ry="5" fill="#4A7010" />
        <circle cx="29" cy="37" r="2" fill="#212121" />
        <circle cx="35" cy="37" r="2" fill="#212121" />
        <path
          d="M24 42 Q32 48 40 42"
          stroke="#212121"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M12 28 Q8 18 18 14 Q24 24 20 30"
          fill="#1565C0"
        />
        <path
          d="M52 28 Q56 18 46 14 Q40 24 44 30"
          fill="#1565C0"
        />
        <ellipse cx="18" cy="38" rx="8" ry="6" fill="#6D9E13" />
        <ellipse cx="46" cy="38" rx="8" ry="6" fill="#6D9E13" />
      </svg>
      {showText && (
        <span className="font-heading font-bold text-xl text-white">Nebbi</span>
      )}
    </div>
  );
}

export function GuineoLogo({ size = 32, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 32 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 4C12 4 8 10 8 20C8 30 12 38 16 40C20 38 24 30 24 20C24 10 20 4 16 4Z"
        fill="#6D9E13"
      />
      <ellipse cx="16" cy="28" rx="8" ry="5" fill="#DEDB8D" />
      <circle cx="16" cy="28" r="3" fill="#FFC107" />
      <path
        d="M10 16C10 10 14 6 16 6C18 6 22 10 22 16"
        stroke="#4A7010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M8 24C6 28 8 36 16 40"
        stroke="#4A7010"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M24 24C26 28 24 36 16 40"
        stroke="#4A7010"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="16" cy="20" rx="3" ry="2" fill="#9FC238" opacity="0.5" />
    </svg>
  );
}

export function NebbiMascot({ size = 200, variant = "full", ...props }: LogoProps & { variant?: "full" | "icon" | "loading" }) {
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="28" cy="28" r="26" fill="#6D9E13" />
        <circle cx="20" cy="24" r="5" fill="#1565C0" />
        <circle cx="36" cy="24" r="5" fill="#1565C0" />
        <circle cx="21" cy="23" r="2" fill="#FFC107" />
        <circle cx="37" cy="23" r="2" fill="#FFC107" />
        <ellipse cx="28" cy="34" rx="6" ry="4" fill="#4A7010" />
        <circle cx="26" cy="33" r="1.5" fill="#212121" />
        <circle cx="30" cy="33" r="1.5" fill="#212121" />
        <path d="M22 38 Q28 42 34 38" stroke="#212121" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "loading") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className="animate-pulse"
      >
        <circle cx="28" cy="28" r="26" fill="#6D9E13" />
        <circle cx="20" cy="24" r="5" fill="#1565C0" />
        <circle cx="36" cy="24" r="5" fill="#1565C0" />
        <circle cx="21" cy="23" r="2" fill="#FFC107" />
        <circle cx="37" cy="23" r="2" fill="#FFC107" />
        <ellipse cx="28" cy="34" rx="6" ry="4" fill="#4A7010" />
        <circle cx="26" cy="33" r="1.5" fill="#212121" />
        <circle cx="30" cy="33" r="1.5" fill="#212121" />
        <path d="M22 38 Q28 42 34 38" stroke="#212121" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse cx="100" cy="110" rx="55" ry="45" fill="#6D9E13" />
      <ellipse cx="100" cy="115" rx="40" ry="30" fill="#4A7010" />
      <circle cx="70" cy="90" r="14" fill="#6D9E13" />
      <circle cx="130" cy="90" r="14" fill="#6D9E13" />
      <circle cx="71" cy="88" r="7" fill="#1565C0" />
      <circle cx="131" cy="88" r="7" fill="#1565C0" />
      <circle cx="73" cy="86" r="3" fill="#FFC107" />
      <circle cx="133" cy="86" r="3" fill="#FFC107" />
      <ellipse cx="100" cy="130" rx="18" ry="10" fill="#4A7010" />
      <circle cx="94" cy="128" r="4" fill="#212121" />
      <circle cx="106" cy="128" r="4" fill="#212121" />
      <path d="M82 140 Q100 150 118 140" stroke="#212121" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M35 100 Q25 70 45 60 Q55 85 48 105" fill="#1565C0" />
      <path d="M165 100 Q175 70 155 60 Q145 85 152 105" fill="#1565C0" />
      <ellipse cx="40" cy="130" rx="18" ry="14" fill="#6D9E13" />
      <ellipse cx="160" cy="130" rx="18" ry="14" fill="#6D9E13" />
      <path d="M60 160 Q80 170 100 165 Q120 170 140 160" stroke="#4A7010" strokeWidth="10" strokeLinecap="round" fill="none" />
      <ellipse cx="55" cy="75" rx="8" ry="12" fill="#6D9E13" />
      <ellipse cx="145" cy="75" rx="8" ry="12" fill="#6D9E13" />
      <ellipse cx="55" cy="78" rx="4" ry="6" fill="#1565C0" />
      <ellipse cx="145" cy="78" rx="4" ry="6" fill="#1565C0" />
    </svg>
  );
}

export function ProductIcon({ product, size = 24 }: { product: string; size?: number }) {
  const icons: Record<string, ReactElement> = {
    guineo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C10 3 7 6 7 11C7 16 10 19 12 20C14 19 17 16 17 11C17 6 14 3 12 3Z" fill="#6D9E13" />
        <ellipse cx="12" cy="13" rx="5" ry="3" fill="#DEDB8D" />
        <circle cx="12" cy="13" r="1.5" fill="#FFC107" />
        <path d="M8 9C8 6 10 4 12 4C14 4 16 6 16 9" stroke="#4A7010" strokeWidth="1.2" fill="none" />
      </svg>
    ),
    cafe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="14" rx="7" ry="6" fill="#6F4E37" />
        <ellipse cx="12" cy="13" rx="5" ry="4" fill="#8B6914" />
        <path d="M8 8C7 6 9 4 12 4C15 4 17 6 16 8" stroke="#6D9E13" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    cacao: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="14" rx="6" ry="7" fill="#4A2C2A" />
        <ellipse cx="12" cy="12" rx="4" ry="5" fill="#6B4423" />
        <path d="M10 6L12 4L14 6" stroke="#6D9E13" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    naranja: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="13" r="8" fill="#FF8C00" />
        <path d="M12 5L12 3M12 3L14 4M12 3L10 4" stroke="#2D8B4E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <ellipse cx="10" cy="12" rx="2" ry="3" fill="#FFA500" opacity="0.5" />
      </svg>
    ),
    aguacate: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="14" rx="7" ry="8" fill="#568203" />
        <ellipse cx="12" cy="15" rx="5" ry="6" fill="#9DC828" />
        <circle cx="12" cy="16" r="4" fill="#6B4423" />
      </svg>
    ),
    default: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" fill="#6D9E13" />
        <path d="M8 12C8 12 10 8 12 8C14 8 16 12 16 12" stroke="#4A7010" strokeWidth="1.5" fill="none" />
        <path d="M12 12L12 18" stroke="#4A7010" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };

  return icons[product.toLowerCase()] || icons.default;
}

export function CertificationBadge({ type, size = "md" }: { type: "fairtrade" | "rainforest"; size?: "sm" | "md" }) {
  const isFairtrade = type === "fairtrade";
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${sizeClasses}`}
      style={{
        backgroundColor: isFairtrade ? "#FFF3E0" : "#E8F5E9",
        color: isFairtrade ? "#E65100" : "#2E7D32",
        borderColor: isFairtrade ? "#FFCC80" : "#A5D6A7",
      }}
    >
      <svg width={size === "sm" ? 12 : 16} height={size === "sm" ? 12 : 16} viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z" />
      </svg>
      {isFairtrade ? "Fairtrade" : "Rainforest Alliance"}
    </span>
  );
}

export default { NebbiLogo, GuineoLogo, NebbiMascot, ProductIcon, CertificationBadge };