import type { Product, CertificationType } from "@/types/product";

// Raw product from the Railway API /public/products endpoint
export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  crop: string;
  variety: string;
  quantityAvailable: number;
  unit: string;
  referencePrice: number;
  currency: string;
  certification: string | null;
  coverImage: string | null;
  images: string[];
  farmName: string;
  location: string;
  passportUrl: string | null;
}

// Map crop to frontend category
const CROP_CATEGORY_MAP: Record<string, string> = {
  GUINEO: "Plátano",
  CAFE: "Café",
  CACAO: "Cacao",
  MANGO: "Mango",
  ARROZ: "Arroz",
  PALMA: "Palma Aceitera",
  PLATANO: "Plátano",
  GANADERIA: "Ganadería",
  GANADERÍA: "Ganadería",
};

// Map certification string to CertificationType array
function mapCertifications(cert: string | null): CertificationType[] {
  if (!cert) return [];
  const upper = cert.toUpperCase();
  const result: CertificationType[] = [];
  if (upper.includes("FAIRTRADE")) result.push("fairtrade");
  if (upper.includes("RAINFOREST")) result.push("rainforest");
  if (upper.includes("ORGANIC") || upper.includes("ORGÁNICO")) result.push("organic");
  return result;
}

let idCounter = 9000;
const idMap = new Map<string, number>();

function toFrontendId(apiId: string): number {
  if (!idMap.has(apiId)) {
    idMap.set(apiId, ++idCounter);
  }
  return idMap.get(apiId)!;
}

export function adaptProduct(api: ApiProduct, index: number): Product {
  const category = CROP_CATEGORY_MAP[api.crop] || api.crop;
  const certifications = mapCertifications(api.certification);
  const frontendId = toFrontendId(api.id);

  return {
    id: frontendId,
    name: api.name,
    description: api.description || `${api.crop} - ${api.variety}, cultivado en ${api.farmName}`,
    images: api.images.length > 0 ? api.images : (api.coverImage ? [api.coverImage] : ["/nebbi.png"]),
    price: api.referencePrice,
    originalPrice: Math.round(api.referencePrice * 1.1),
    discount: 9,
    unit: `por ${api.unit}`,
    location: api.location,
    rating: 4.5,
    reviews: 0,
    sales: 0,
    stock: Math.round(api.quantityAvailable),
    status: api.quantityAvailable > 0 ? "disponible" : "agotado",
    category,
    certifications,
    badge: certifications.length > 0 ? "Certificado" : null,
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Nequi", icon: "nequi" },
    ],
    shipping: {
      free: api.referencePrice > 50000,
      cost: api.referencePrice > 50000 ? 0 : 8000,
      estimatedDays: "2-5 días",
      available: true,
    },
    relatedProducts: [],
    traceability: {
      producer: {
        id: frontendId + 1000,
        name: api.farmName,
        farm: api.farmName,
        location: api.location,
        verified: api.certification !== null,
        memberSince: "2025",
        description: `Productor de ${api.crop} en ${api.location}`,
      },
      origin: api.location,
      harvestDate: "Cosecha reciente",
      lotNumber: `LOTE-${api.id.slice(-6).toUpperCase()}`,
      farmingMethod: "tradiciona",
    },
  };
}

export function adaptProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map((p, i) => adaptProduct(p, i));
}
