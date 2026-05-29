export interface ProducerFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  organization: string;
  documentType: string;
  documentNumber: string;
  description: string;
  location: string;
  category: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  logoFile: File | null;
  logoPreview: string;
  acceptTerms: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  discount: string;
  stock: string;
  category: string;
  tags: string[];
  weight: string;
  dimensions: string;
  unit: string;
  available: boolean;
  deliveryMethods: string[];
  imageFiles: File[];
  imagePreviews: string[];
}

export type RegistrationStep = "producer" | "product" | "review" | "success";

export interface ProducerRegistrationState {
  currentStep: RegistrationStep;
  producerData: ProducerFormData;
  products: ProductFormData[];
  isSubmitting: boolean;
  errors: Record<string, string>;
  userId: string | null;
  producerId: string | null;
}

export const PRODUCT_CATEGORIES = [
  { value: "cafe", label: "Cafe" },
  { value: "cacao", label: "Cacao" },
  { value: "platano", label: "Platano" },
  { value: "arroz", label: "Arroz" },
  { value: "palma", label: "Palma Aceitera" },
  { value: "mango", label: "Mango" },
  { value: "ganaderia", label: "Ganaderia" },
  { value: "miel", label: "Miel" },
  { value: "frutas", label: "Frutas Tropicales" },
  { value: "hortalizas", label: "Hortalizas" },
  { value: "otros", label: "Otros" },
] as const;

export const DOCUMENT_TYPES = [
  { value: "CC", label: "Cedula de Ciudadania" },
  { value: "CE", label: "Cedula de Extranjeria" },
  { value: "NIT", label: "NIT" },
  { value: "TI", label: "Tarjeta de Identidad" },
] as const;

export const DELIVERY_METHODS = [
  { value: "domicilio", label: "Domicilio" },
  { value: "recogida", label: "Recogida en finca" },
  { value: "punto_encuentro", label: "Punto de encuentro" },
  { value: "envio_nacional", label: "Envio nacional" },
] as const;

export const PRODUCT_UNITS = [
  { value: "kg", label: "Kilogramo" },
  { value: "lb", label: "Libra" },
  { value: "unidad", label: "Unidad" },
  { value: "atado", label: "Atado" },
  { value: "canasta", label: "Canasta" },
  { value: "bulto", label: "Bulto" },
  { value: "arroba", label: "Arroba" },
] as const;

export const EMPTY_PRODUCT: ProductFormData = {
  name: "",
  description: "",
  price: "",
  discount: "",
  stock: "",
  category: "",
  tags: [],
  weight: "",
  dimensions: "",
  unit: "kg",
  available: true,
  deliveryMethods: [],
  imageFiles: [],
  imagePreviews: [],
};

export const EMPTY_PRODUCER: ProducerFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  organization: "",
  documentType: "CC",
  documentNumber: "",
  description: "",
  location: "",
  category: "",
  socialMedia: {
    instagram: "",
    facebook: "",
    whatsapp: "",
  },
  logoFile: null,
  logoPreview: "",
  acceptTerms: false,
};
