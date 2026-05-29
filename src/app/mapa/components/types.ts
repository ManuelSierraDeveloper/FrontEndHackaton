export type ProductType = 'cafe' | 'cacao' | 'platano' | 'arroz' | 'palma' | 'mango' | 'ganaderia';

export type CertificationType = 'organic' | 'conventional' | 'mixed';

export type ProducerType = 'finca' | 'granja' | 'planta' | 'cooperativa';

export interface Representative {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Product {
  type: ProductType;
  variety?: string;
  certification: CertificationType;
  annualProduction: string;
}

export interface RainforestAlliance {
  certified: boolean;
  certificationId: string;
  validUntil: string;
  certifiedArea: string;
  auditDate: string;
  score?: number;
}

export interface Traceability {
  lotsThisYear: number;
  methodology: 'traditional' | 'mixed' | 'technified';
  yieldPerHectare: string;
  harvestSeasons: string[];
  lastInspection: string;
}

export interface Producer {
  id: string;
  name: string;
  type: ProducerType;
  coordinates: { lat: number; lng: number };
  address: string;
  municipality: string;
  region: string;
  representative: Representative;
  products: Product[];
  rainforestAlliance: RainforestAlliance;
  traceability: Traceability;
  photos?: string[];
  certifications?: string[];
}

export interface FilterState {
  products: ProductType[];
  certified: 'all' | 'certified' | 'in-progress' | 'none';
  municipality: string;
  searchQuery: string;
}

export const PRODUCT_LABELS: Record<ProductType, string> = {
  cafe: 'Café',
  cacao: 'Cacao',
  platano: 'Plátano',
  arroz: 'Arroz',
  palma: 'Palma Aceitera',
  mango: 'Mango',
  ganaderia: 'Ganadería',
};

export const PRODUCT_COLORS: Record<ProductType, string> = {
  cafe: '#6D9E13',
  cacao: '#8B4513',
  platano: '#FFD700',
  arroz: '#F5F5DC',
  palma: '#228B22',
  mango: '#FF8C00',
  ganaderia: '#A0522D',
};

export type AgrotourismType = 'finca_cafetera' | 'cacaotal' | 'mixta' | 'ganadera' | 'frutal';

export interface AgrotourismTour {
  duration: string;
  capacity: number;
  pricePerPerson: number;
  currency: string;
  availability: string[];
  description: string;
}

export interface AgrotourismActivity {
  name: string;
  icon: string;
  description: string;
}

export interface AgrotourismServices {
  lunch: boolean;
  transportation: boolean;
  accommodation: boolean;
  guide: boolean;
  others: string[];
}

export interface AgrotourismGuide {
  name: string;
  phone: string;
  email: string;
}

export interface AgrotourismPoint {
  id: string;
  farmName: string;
  type: AgrotourismType;
  coordinates: { lat: number; lng: number };
  address: string;
  municipality: string;
  region: string;
  tour: AgrotourismTour;
  activities: AgrotourismActivity[];
  services: AgrotourismServices;
  guide: AgrotourismGuide;
  photos: string[];
  rating?: number;
  reviews?: number;
  active: boolean;
  verifiedAt?: string;
}

export const AGROTOURISM_COLOR = '#00BCD4';

export const AGROTOURISM_TYPE_LABELS: Record<AgrotourismType, string> = {
  finca_cafetera: 'Finca Cafetera',
  cacaotal: 'Cacaotal',
  mixta: 'Finca Mixta',
  ganadera: 'Finca Ganadera',
  frutal: 'Finca Frutal',
};
