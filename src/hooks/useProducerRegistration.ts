"use client";

import { useState, useCallback } from "react";
import type {
  ProducerFormData,
  ProductFormData,
  RegistrationStep,
  ProducerRegistrationState,
} from "@/types/producer-form";
import { EMPTY_PRODUCER, EMPTY_PRODUCT } from "@/types/producer-form";
import { validateForm, commonPatterns } from "@/lib/validation";
import type { ValidationSchema } from "@/lib/validation";
import { authService } from "@/services/auth.service";
import { producerService } from "@/services/producer.service";
import { productService } from "@/services/product.service";
import { ApiException } from "@/lib/api-client";

const producerSchema: ValidationSchema<ProducerFormData> = {
  fullName: { required: true, minLength: 3, maxLength: 120 },
  email: { required: true, pattern: commonPatterns.email },
  password: { required: true, minLength: 8, maxLength: 100 },
  confirmPassword: {
    required: true,
    custom: (value) => (typeof value === "string" && value.length < 8 ? "Minimo 8 caracteres" : null),
  },
  phone: { required: true, pattern: commonPatterns.phone },
  documentNumber: { required: true, minLength: 4, maxLength: 30 },
  description: { required: true, minLength: 20, maxLength: 500 },
  location: { required: true, minLength: 3, maxLength: 255 },
  category: { required: true },
  acceptTerms: {
    required: true,
    custom: (value) => (value !== true ? "Debes aceptar los terminos" : null),
  },
};

const productSchema: ValidationSchema<ProductFormData> = {
  name: { required: true, minLength: 3, maxLength: 120 },
  description: { required: true, minLength: 10, maxLength: 800 },
  price: {
    required: true,
    pattern: commonPatterns.price,
    custom: (value) => {
      const num = Number(value);
      if (isNaN(num) || num <= 0) return "Precio debe ser mayor a 0";
      return null;
    },
  },
  stock: {
    required: true,
    custom: (value) => {
      const num = Number(value);
      if (isNaN(num) || num < 0) return "Stock no valido";
      return null;
    },
  },
  category: { required: true },
};

export function useProducerRegistration(onSuccess?: () => void) {
  const [state, setState] = useState<ProducerRegistrationState>({
    currentStep: "producer",
    producerData: { ...EMPTY_PRODUCER },
    products: [{ ...EMPTY_PRODUCT }],
    isSubmitting: false,
    errors: {},
    userId: null,
    producerId: null,
  });

  const updateProducerData = useCallback(
    (updates: Partial<ProducerFormData>) => {
      setState((prev) => ({
        ...prev,
        producerData: { ...prev.producerData, ...updates },
        errors: Object.keys(updates).reduce((acc, key) => {
          const newErrors = { ...acc };
          delete newErrors[key as keyof ProducerFormData];
          return newErrors;
        }, prev.errors),
      }));
    },
    []
  );

  const updateProduct = useCallback(
    (index: number, updates: Partial<ProductFormData>) => {
      setState((prev) => {
        const newProducts = [...prev.products];
        newProducts[index] = { ...newProducts[index], ...updates };
        return { ...prev, products: newProducts };
      });
    },
    []
  );

  const addProduct = useCallback(() => {
    setState((prev) => ({
      ...prev,
      products: [...prev.products, { ...EMPTY_PRODUCT }],
    }));
  }, []);

  const removeProduct = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  }, []);

  const setStep = useCallback((step: RegistrationStep) => {
    setState((prev) => ({ ...prev, currentStep: step, errors: {} }));
  }, []);

  const validateProducerStep = useCallback((): boolean => {
    const { errors, isValid } = validateForm(state.producerData, producerSchema);

    if (
      state.producerData.password !== state.producerData.confirmPassword
    ) {
      errors.confirmPassword = "Las contrasenas no coinciden";
    }

    setState((prev) => ({ ...prev, errors: errors as Record<string, string> }));
    return isValid && !errors.confirmPassword;
  }, [state.producerData]);

  const validateProductStep = useCallback((): boolean => {
    let allValid = true;
    const productErrors: Record<string, string> = {};

    state.products.forEach((product, index) => {
      const { errors, isValid } = validateForm(product, productSchema);
      if (!isValid) {
        allValid = false;
        Object.entries(errors).forEach(([key, msg]) => {
          if (msg) productErrors[`product_${index}_${key}`] = msg;
        });
      }
    });

    setState((prev) => ({ ...prev, errors: productErrors }));
    return allValid;
  }, [state.products]);

  const goToProducts = useCallback(() => {
    if (validateProducerStep()) {
      setStep("product");
    }
  }, [validateProducerStep, setStep]);

  const goToReview = useCallback(() => {
    if (validateProductStep()) {
      setStep("review");
    }
  }, [validateProductStep, setStep]);

  const submit = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true, errors: {} }));

    try {
      const user = await authService.register({
        fullName: state.producerData.fullName,
        email: state.producerData.email,
        password: state.producerData.password,
        role: "PRODUCTOR",
      });

      const producerProfile = await producerService.createProfile(
        {
          documentType: state.producerData.documentType,
          documentNumber: state.producerData.documentNumber,
          phone: state.producerData.phone,
          organization: state.producerData.organization || undefined,
        },
        ""
      );

      const farm = await producerService.createFarm(
        {
          name: state.producerData.organization || state.producerData.fullName,
          location: state.producerData.location,
          description: state.producerData.description,
          areaHectares: 0,
        },
        ""
      );

      for (const product of state.products) {
        const imageUrls: string[] = [];
        for (const file of product.imageFiles) {
          try {
            const result = await productService.uploadImage(file, "");
            imageUrls.push(result.url);
          } catch {
            imageUrls.push(`/placeholder-product-${Math.floor(Math.random() * 6) + 1}.jpg`);
          }
        }

        await productService.create(
          {
            name: product.name,
            description: product.description,
            price: Number(product.price),
            discount: product.discount ? Number(product.discount) : undefined,
            stock: Number(product.stock),
            category: product.category,
            images: imageUrls,
            tags: product.tags,
            status: "nuevo",
            weight: product.weight ? Number(product.weight) : undefined,
            dimensions: product.dimensions || undefined,
            available: product.available,
            deliveryMethods: product.deliveryMethods,
            unit: product.unit,
            farmId: farm.id,
          },
          ""
        );
      }

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        currentStep: "success",
        userId: user.id,
        producerId: producerProfile.id,
      }));

      onSuccess?.();
    } catch (error) {
      let errorMessage = "Error al registrar. Intenta de nuevo.";

      if (error instanceof ApiException) {
        if (error.errorCode === "EMAIL_ALREADY_EXISTS") {
          errorMessage = "Este correo ya esta registrado.";
        } else {
          errorMessage = error.message;
        }
      }

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: { submit: errorMessage },
      }));
    }
  }, [state.producerData, state.products, onSuccess]);

  const reset = useCallback(() => {
    setState({
      currentStep: "producer",
      producerData: { ...EMPTY_PRODUCER },
      products: [{ ...EMPTY_PRODUCT }],
      isSubmitting: false,
      errors: {},
      userId: null,
      producerId: null,
    });
  }, []);

  return {
    state,
    updateProducerData,
    updateProduct,
    addProduct,
    removeProduct,
    setStep,
    goToProducts,
    goToReview,
    submit,
    reset,
    validateProducerStep,
    validateProductStep,
  };
}
