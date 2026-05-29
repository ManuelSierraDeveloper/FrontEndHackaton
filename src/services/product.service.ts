import { api } from "@/lib/api-client";
import type { CreateProductRequest, ProductResponse } from "@/types/api";

export const productService = {
  create: (data: CreateProductRequest, token: string) =>
    api.post<ProductResponse>("/products", data, token),

  publish: (productId: string, token: string) =>
    api.post<ProductResponse>(`/products/${productId}/publish`, {}, token),

  markSoldOut: (productId: string, token: string) =>
    api.post<ProductResponse>(`/products/${productId}/mark-sold-out`, {}, token),

  getPublicCatalog: (params?: { category?: string; page?: number; size?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set("category", params.category);
    if (params?.page !== undefined) searchParams.set("page", String(params.page));
    if (params?.size !== undefined) searchParams.set("size", String(params.size));
    const query = searchParams.toString();
    return api.get<{ content: ProductResponse[]; totalElements: number }>(
      `/public/products${query ? `?${query}` : ""}`
    );
  },

  uploadImage: (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.upload<{ url: string }>("/uploads/image", formData, token);
  },
};
