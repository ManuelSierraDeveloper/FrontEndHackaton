"use client";

import { useState, useCallback, useRef } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_DIMENSION = 1920;

export interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface UseImageUploadOptions {
  maxFiles?: number;
  onImagesChange?: (files: File[]) => void;
}

function compressImage(file: File, maxWidth = MAX_DIMENSION): Promise<File> {
  return new Promise((resolve) => {
    if (file.size < 500 * 1024) {
      resolve(file);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        0.8
      );
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

export function useImageUpload({ maxFiles = 5, onImagesChange }: UseImageUploadOptions = {}) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name}: formato no permitido (usa JPG, PNG, WebP o AVIF)`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: excede 5MB`;
    }
    return null;
  };

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newErrors: string[] = [];
      const remainingSlots = maxFiles - images.length;

      if (remainingSlots <= 0) {
        setErrors([`Maximo ${maxFiles} imagenes`]);
        return;
      }

      const filesToProcess = fileArray.slice(0, remainingSlots);
      const validFiles: File[] = [];

      for (const file of filesToProcess) {
        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
        } else {
          validFiles.push(file);
        }
      }

      const compressedFiles = await Promise.all(validFiles.map(compressImage));

      const newImages: ImageFile[] = compressedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(7),
      }));

      setImages((prev) => {
        const updated = [...prev, ...newImages];
        onImagesChange?.(updated.map((img) => img.file));
        return updated;
      });

      setErrors(newErrors);
    },
    [images.length, maxFiles, onImagesChange]
  );

  const removeImage = useCallback(
    (id: string) => {
      setImages((prev) => {
        const updated = prev.filter((img) => {
          if (img.id === id) {
            URL.revokeObjectURL(img.preview);
            return false;
          }
          return true;
        });
        onImagesChange?.(updated.map((img) => img.file));
        return updated;
      });
    },
    [onImagesChange]
  );

  const reorderImages = useCallback(
    (fromIndex: number, toIndex: number) => {
      setImages((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        onImagesChange?.(updated.map((img) => img.file));
        return updated;
      });
    },
    [onImagesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    },
    [processFiles]
  );

  const clearAll = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setErrors([]);
    onImagesChange?.([]);
  }, [images, onImagesChange]);

  return {
    images,
    errors,
    isDragging,
    fileInputRef,
    processFiles,
    removeImage,
    reorderImages,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFilePicker,
    handleFileChange,
    clearAll,
  };
}
