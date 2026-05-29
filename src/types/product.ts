export type ProductStatus = "nuevo" | "usado" | "disponible" | "agotado";

export type CertificationType = "fairtrade" | "rainforest" | "organic";

export interface Producer {
  id: number;
  name: string;
  farm: string;
  location: string;
  avatar?: string;
  verified: boolean;
  memberSince: string;
  description: string;
}

export interface TraceabilityInfo {
  producer: Producer;
  origin: string;
  harvestDate: string;
  lotNumber: string;
  farmingMethod: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  unit: string;
  location: string;
  rating: number;
  reviews: number;
  sales: number;
  stock: number;
  status: ProductStatus;
  category: string;
  certifications: CertificationType[];
  badge: string | null;
  paymentMethods: PaymentMethod[];
  shipping: ShippingInfo;
  relatedProducts: number[];
  traceability: TraceabilityInfo;
}

export interface PaymentMethod {
  name: string;
  icon: string;
}

export interface ShippingInfo {
  free: boolean;
  cost: number;
  estimatedDays: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const CERTIFICATION_CONFIG: Record<CertificationType, { bg: string; text: string; border: string; label: string }> = {
  fairtrade: { bg: "#FFF3E0", text: "#E65100", border: "#FFCC80", label: "Fairtrade" },
  rainforest: { bg: "#E8F5E9", text: "#2E7D32", border: "#A5D6A7", label: "Rainforest" },
  organic: { bg: "#E3F2FD", text: "#1565C0", border: "#90CAF9", label: "Organico" },
};

export const STATUS_CONFIG: Record<ProductStatus, { bg: string; text: string; label: string }> = {
  nuevo: { bg: "#E8F5E9", text: "#2E7D32", label: "Nuevo" },
  usado: { bg: "#FFF8E1", text: "#F57F17", label: "Usado" },
  disponible: { bg: "#E3F2FD", text: "#1565C0", label: "Disponible" },
  agotado: { bg: "#FFEBEE", text: "#C62828", label: "Agotado" },
};

export const FARMING_METHOD_LABELS: Record<string, string> = {
  organico: "Cultivo Organico",
  tradicional: "Cultivo Tradicional",
  agroforestal: "Sistema Agroforestal",
  hidroponico: "Hidroponia",
  permacultura: "Permacultura",
};
