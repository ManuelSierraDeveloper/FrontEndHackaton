"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Store,
  Package,
  Eye,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  FileText,
  Camera,
  Shield,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductFormSection } from "./product-form-section";
import { useProducerRegistration } from "@/hooks/useProducerRegistration";
import { useToast, ToastContainer } from "@/components/ui/toast";
import { DOCUMENT_TYPES, PRODUCT_CATEGORIES } from "@/types/producer-form";
import type { RegistrationStep } from "@/types/producer-form";

interface ProducerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS: { key: RegistrationStep; label: string; icon: typeof Store }[] = [
  { key: "producer", label: "Informacion", icon: User },
  { key: "product", label: "Productos", icon: Package },
  { key: "review", label: "Revisar", icon: Eye },
];

function StepIndicator({
  currentStep,
  steps,
}: {
  currentStep: RegistrationStep;
  steps: typeof STEPS;
}) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-4 px-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentIndex;
        const isCompleted =
          currentStep === "success" || index < currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300
                  ${isCompleted
                    ? "bg-[#6D9E13] text-white"
                    : isActive
                    ? "bg-[#6D9E13]/10 text-[#6D9E13] border-2 border-[#6D9E13]"
                    : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`
                  text-xs font-medium hidden sm:block
                  ${isActive ? "text-[#6D9E13]" : isCompleted ? "text-gray-700" : "text-gray-400"}
                `}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 rounded-full transition-colors duration-300
                  ${isCompleted ? "bg-[#6D9E13]" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProducerInfoStep({
  data,
  errors,
  onUpdate,
}: {
  data: ReturnType<typeof useProducerRegistration>["state"]["producerData"];
  errors: Record<string, string>;
  onUpdate: (updates: Partial<typeof data>) => void;
}) {
  const handleLogoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const preview = URL.createObjectURL(file);
        onUpdate({ logoFile: file, logoPreview: preview });
      }
    },
    [onUpdate]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#DEDB8D]/50 flex items-center justify-center">
          <Store className="w-8 h-8 text-[#6D9E13]" />
        </div>
        <h3 className="font-heading font-bold text-xl text-gray-900">
          Informacion del productor
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Cuéntanos sobre ti y tu emprendimiento
        </p>
      </div>

      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
        >
          <Shield className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errors.submit}</p>
        </motion.div>
      )}

      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#6D9E13]/50 transition-colors">
            {data.logoPreview ? (
              <img
                src={data.logoPreview}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <label
            htmlFor="logo-upload"
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#6D9E13] text-white flex items-center justify-center cursor-pointer hover:bg-[#1B5E34] transition-colors shadow-md"
          >
            <Camera className="w-4 h-4" />
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>
        <span className="text-xs text-gray-500 mt-2">Foto / Logo</span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre completo"
            value={data.fullName}
            onChange={(e) => onUpdate({ fullName: e.target.value })}
            placeholder="Tu nombre completo"
            error={errors.fullName}
            required
          />
          <Input
            label="Nombre del emprendimiento"
            value={data.organization}
            onChange={(e) => onUpdate({ organization: e.target.value })}
            placeholder="Ej: Finca El Progreso"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Correo electronico"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="correo@ejemplo.com"
            error={errors.email}
            required
          />
          <Input
            label="Telefono"
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="+57 300 123 4567"
            error={errors.phone}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contrasena"
            type="password"
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            placeholder="Minimo 8 caracteres"
            error={errors.password}
            required
          />
          <Input
            label="Confirmar contrasena"
            type="password"
            value={data.confirmPassword}
            onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
            placeholder="Repite la contrasena"
            error={errors.confirmPassword}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tipo de documento"
            value={data.documentType}
            onChange={(e) => onUpdate({ documentType: e.target.value })}
            options={DOCUMENT_TYPES.map((d) => ({ value: d.value, label: d.label }))}
          />
          <Input
            label="Numero de documento"
            value={data.documentNumber}
            onChange={(e) => onUpdate({ documentNumber: e.target.value })}
            placeholder="1234567890"
            error={errors.documentNumber}
            required
          />
        </div>

        <Input
          label="Ubicacion"
          value={data.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          placeholder="Municipio, Departamento"
          error={errors.location}
          required
        />

        <Select
          label="Categoria principal"
          value={data.category}
          onChange={(e) => onUpdate({ category: e.target.value })}
          options={[{ value: "", label: "Seleccionar..." }, ...PRODUCT_CATEGORIES]}
          error={errors.category}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Descripcion del emprendimiento
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Cuentanos sobre tu finca, tus productos, tu historia..."
            rows={4}
            className={`
              w-full bg-white border rounded-lg px-4 py-3 text-base
              placeholder:text-gray-500 resize-none
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${errors.description
                ? "border-error focus:border-error focus:ring-red-100"
                : "border-gray-300 focus:border-[#6D9E13] focus:ring-[#6D9E13]/10"
              }
            `}
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-error">{errors.description}</p>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Redes sociales (opcional)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Instagram"
              value={data.socialMedia.instagram}
              onChange={(e) =>
                onUpdate({
                  socialMedia: { ...data.socialMedia, instagram: e.target.value },
                })
              }
              placeholder="@tu_usuario"
            />
            <Input
              label="Facebook"
              value={data.socialMedia.facebook}
              onChange={(e) =>
                onUpdate({
                  socialMedia: { ...data.socialMedia, facebook: e.target.value },
                })
              }
              placeholder="Tu pagina"
            />
            <Input
              label="WhatsApp"
              value={data.socialMedia.whatsapp}
              onChange={(e) =>
                onUpdate({
                  socialMedia: { ...data.socialMedia, whatsapp: e.target.value },
                })
              }
              placeholder="+57 300..."
            />
          </div>
        </div>

        <Checkbox
          label="Acepto los terminos y condiciones de la plataforma Nebbi"
          checked={data.acceptTerms}
          onChange={(e) => onUpdate({ acceptTerms: e.target.checked })}
        />
        {errors.acceptTerms && (
          <p className="text-sm text-error">{errors.acceptTerms}</p>
        )}
      </div>
    </motion.div>
  );
}

function ReviewStep({
  producerData,
  products,
}: {
  producerData: ReturnType<typeof useProducerRegistration>["state"]["producerData"];
  products: ReturnType<typeof useProducerRegistration>["state"]["products"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#DEDB8D]/50 flex items-center justify-center">
          <Eye className="w-8 h-8 text-[#6D9E13]" />
        </div>
        <h3 className="font-heading font-bold text-xl text-gray-900">
          Revisa tu informacion
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Verifica que todo este correcto antes de enviar
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 space-y-3">
        <h4 className="font-heading font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-4 h-4 text-[#6D9E13]" />
          Informacion del productor
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-900">{producerData.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <span>{producerData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{producerData.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{producerData.location}</span>
          </div>
          {producerData.organization && (
            <div className="flex items-center gap-2 text-gray-600">
              <Store className="w-3.5 h-3.5 text-gray-400" />
              <span>{producerData.organization}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-3.5 h-3.5 text-gray-400" />
            <span>{producerData.documentType}: {producerData.documentNumber}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed pt-2 border-t border-gray-200">
          {producerData.description}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-heading font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#6D9E13]" />
          Productos ({products.length})
        </h4>
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{product.name || `Producto ${index + 1}`}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label || product.category}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#6D9E13]">
                  ${Number(product.price || 0).toLocaleString()}
                </p>
                {product.discount && Number(product.discount) > 0 && (
                  <p className="text-xs text-success">-{product.discount}% dto</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span>Stock: {product.stock}</span>
              <span>Unidad: {product.unit}</span>
              {product.imageFiles.length > 0 && (
                <span>{product.imageFiles.length} imagen(es)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SuccessStep({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-success" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-heading font-bold text-2xl text-gray-900 mb-2"
      >
        ¡Registro exitoso!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 max-w-md mb-8"
      >
        Tu cuenta ha sido creada y tus productos estan listos para ser publicados.
        Pronto estaran visibles en la tienda.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button onClick={onClose} size="lg">
          <Store className="w-5 h-5 mr-2" />
          Ir a la tienda
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function ProducerRegistrationModal({
  isOpen,
  onClose,
}: ProducerRegistrationModalProps) {
  const {
    state,
    updateProducerData,
    updateProduct,
    addProduct,
    removeProduct,
    goToProducts,
    goToReview,
    submit,
    reset,
    setStep,
  } = useProducerRegistration();

  const { toasts, dismissToast, success } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [isOpen, state.currentStep]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleSubmit = useCallback(async () => {
    await submit();
    success("¡Registro completado exitosamente!");
  }, [submit, success]);

  const getStepTitle = () => {
    if (state.currentStep === "success") return "¡Registro completado!";
    const step = STEPS.find((s) => s.key === state.currentStep);
    return step ? `Paso ${STEPS.indexOf(step) + 1}: ${step.label}` : "";
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
              aria-hidden="true"
            />

            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label="Registro de productor"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                relative z-10 bg-white w-full mx-0 md:mx-4
                h-full md:h-auto md:max-h-[92vh]
                md:rounded-2xl rounded-none
                shadow-xl overflow-hidden flex flex-col
                max-w-4xl
              "
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#DEDB8D]/50 flex items-center justify-center">
                    <Store className="w-5 h-5 text-[#6D9E13]" />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-gray-900">
                    {getStepTitle()}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {state.currentStep !== "success" && (
                <StepIndicator currentStep={state.currentStep} steps={STEPS} />
              )}

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {state.currentStep === "producer" && (
                    <ProducerInfoStep
                      key="producer"
                      data={state.producerData}
                      errors={state.errors}
                      onUpdate={updateProducerData}
                    />
                  )}

                  {state.currentStep === "product" && (
                    <motion.div
                      key="product"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <ProductFormSection
                        products={state.products}
                        errors={state.errors}
                        onUpdate={updateProduct}
                        onAdd={addProduct}
                        onRemove={removeProduct}
                      />
                    </motion.div>
                  )}

                  {state.currentStep === "review" && (
                    <ReviewStep
                      key="review"
                      producerData={state.producerData}
                      products={state.products}
                    />
                  )}

                  {state.currentStep === "success" && (
                    <SuccessStep key="success" onClose={handleClose} />
                  )}
                </AnimatePresence>
              </div>

              {state.currentStep !== "success" && (
                <div className="shrink-0 border-t border-gray-100 px-6 py-4 bg-white flex items-center justify-between gap-3">
                  <div>
                    {state.currentStep !== "producer" && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          if (state.currentStep === "product") setStep("producer");
                          if (state.currentStep === "review") setStep("product");
                        }}
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Atras
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button type="button" variant="secondary" onClick={handleClose}>
                      Cancelar
                    </Button>

                    {state.currentStep === "producer" && (
                      <Button type="button" onClick={goToProducts}>
                        Siguiente
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}

                    {state.currentStep === "product" && (
                      <Button type="button" onClick={goToReview}>
                        Revisar
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}

                    {state.currentStep === "review" && (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        isLoading={state.isSubmitting}
                        disabled={state.isSubmitting}
                      >
                        {state.isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Registrando...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Registrar y publicar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
