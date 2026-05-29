"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types/product";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 overflow-x-auto">
      <Link href="/" className="hover:text-[#6D9E13] transition-colors shrink-0" aria-label="Inicio">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#6D9E13] transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium whitespace-nowrap">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
