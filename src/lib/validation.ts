export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: unknown) => string | null;
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export function validateField(value: unknown, rule: ValidationRule): string | null {
  const strValue = typeof value === "string" ? value : String(value ?? "");

  if (rule.required && (!strValue || strValue.trim() === "")) {
    return "Este campo es obligatorio";
  }

  if (!strValue || strValue.trim() === "") return null;

  if (rule.minLength && strValue.length < rule.minLength) {
    return `Minimo ${rule.minLength} caracteres`;
  }

  if (rule.maxLength && strValue.length > rule.maxLength) {
    return `Maximo ${rule.maxLength} caracteres`;
  }

  if (rule.pattern && !rule.pattern.test(strValue)) {
    return "Formato no valido";
  }

  if (rule.min !== undefined && typeof value === "number" && value < rule.min) {
    return `El valor minimo es ${rule.min}`;
  }

  if (rule.max !== undefined && typeof value === "number" && value > rule.max) {
    return `El valor maximo es ${rule.max}`;
  }

  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
}

export function validateForm<T extends object>(
  data: T,
  schema: ValidationSchema<T>
): { errors: ValidationErrors<T>; isValid: boolean } {
  const errors: ValidationErrors<T> = {};
  let isValid = true;

  for (const key in schema) {
    const rule = schema[key];
    if (!rule) continue;
    const error = validateField(data[key], rule);
    if (error) {
      errors[key] = error;
      isValid = false;
    }
  }

  return { errors, isValid };
}

export const commonPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\d\s\-+()]{7,20}$/,
  documentNumber: /^[\dA-Za-z-]{4,30}$/,
  price: /^\d+(\.\d{1,2})?$/,
};
