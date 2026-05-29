"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { adaptProducts, type ApiProduct } from "@/lib/api-adapter";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface UsePublicProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
}

export function usePublicProducts(): UsePublicProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/public/products`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (cancelled) return;

        const content: ApiProduct[] = data.content || data || [];
        const adapted = adaptProducts(content);
        setProducts(adapted);
        setTotal(data.totalElements || content.length);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error al cargar productos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error, total };
}
