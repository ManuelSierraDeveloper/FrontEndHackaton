export type UserRole =
  | "ADMIN"
  | "PRODUCTOR"
  | "OPERADOR_TURISTICO"
  | "EXPORTADOR"
  | "COMPRADOR_INTERNACIONAL"
  | "CERTIFICADOR";

export type UserStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED";

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: UserResponse;
}

export interface CreateProducerProfileRequest {
  documentType: string;
  documentNumber: string;
  phone: string;
  organization?: string;
}

export interface ProducerProfileResponse {
  id: string;
  userId: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  organization?: string;
  status: string;
  createdAt: string;
}

export interface CreateFarmRequest {
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  areaHectares: number;
  description?: string;
}

export interface FarmResponse {
  id: string;
  producerId: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  areaHectares: number;
  description?: string;
  status: string;
  photos: FarmPhotoResponse[];
}

export interface FarmPhotoResponse {
  id: string;
  url: string;
  description?: string;
  isPrimary: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  category: string;
  images: string[];
  tags?: string[];
  status: string;
  weight?: number;
  dimensions?: string;
  available: boolean;
  deliveryMethods: string[];
  unit: string;
  farmId: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  category: string;
  images: string[];
  tags: string[];
  status: string;
  weight?: number;
  dimensions?: string;
  available: boolean;
  deliveryMethods: string[];
  unit: string;
  farmId: string;
  producerId: string;
  createdAt: string;
  publishedAt?: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string | null;
}
