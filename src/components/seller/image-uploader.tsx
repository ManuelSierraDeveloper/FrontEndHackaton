"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon, GripVertical } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploaderProps {
  maxFiles?: number;
  onImagesChange?: (files: File[]) => void;
  label?: string;
  error?: string;
}

export function ImageUploader({
  maxFiles = 5,
  onImagesChange,
  label = "Imagenes del producto",
  error,
}: ImageUploaderProps) {
  const {
    images,
    errors: uploadErrors,
    isDragging,
    fileInputRef,
    removeImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFilePicker,
    handleFileChange,
  } = useImageUpload({ maxFiles, onImagesChange });

  const displayError = error || uploadErrors[0];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        aria-label="Subir imagenes"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFilePicker();
        }}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          flex flex-col items-center justify-center gap-3
          cursor-pointer transition-all duration-200
          ${isDragging
            ? "border-baloo-primary bg-[#6D9E13]/5 scale-[1.01]"
            : "border-gray-300 hover:border-baloo-primary/50 hover:bg-gray-50"
          }
          ${displayError ? "border-error" : ""}
        `}
      >
        <div
          className={`
            w-14 h-14 rounded-full flex items-center justify-center
            transition-colors duration-200
            ${isDragging ? "bg-[#6D9E13]/10" : "bg-gray-100"}
          `}
        >
          <Upload
            className={`w-6 h-6 ${isDragging ? "text-[#6D9E13]" : "text-gray-400"}`}
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            Arrastra imagenes aqui o{" "}
            <span className="text-[#6D9E13] underline">selecciona archivos</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG, WebP o AVIF (max. 5MB cada una) &middot; {images.length}/{maxFiles} imagenes
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {displayError && (
        <p className="mt-1.5 text-sm text-error">{displayError}</p>
      )}

      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
              >
                <img
                  src={image.preview}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />

                <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="w-6 h-6 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm"
                    aria-label={`Eliminar imagen ${index + 1}`}
                  >
                    <X className="w-3.5 h-3.5 text-gray-700" />
                  </button>
                </div>

                {index === 0 && (
                  <div className="absolute bottom-1.5 left-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#6D9E13] text-white font-medium">
                      Principal
                    </span>
                  </div>
                )}

                {index > 0 && (
                  <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <GripVertical className="w-4 h-4 text-white drop-shadow" />
                  </div>
                )}
              </motion.div>
            ))}

            {images.length < maxFiles && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  openFilePicker();
                }}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-baloo-primary/50 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#6D9E13] transition-colors duration-200"
                aria-label="Agregar otra imagen"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Agregar</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
