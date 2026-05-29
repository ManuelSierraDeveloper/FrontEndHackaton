"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const displayImages = images.length > 0 ? images : ["/nebbi.png"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square bg-gradient-to-br from-[#DEDB8D]/20 to-[#E3F2FD]/20 rounded-xl overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex items-center justify-center p-8"
          >
            <Image
              src={displayImages[selectedIndex]}
              alt={`${productName} - Imagen ${selectedIndex + 1}`}
              width={400}
              height={400}
              className="object-contain w-full h-full"
              style={
                isZoomed
                  ? { transform: "scale(1.8)", transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                  : undefined
              }
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-[#6D9E13] shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} - Miniatura ${index + 1}`}
                width={64}
                height={64}
                className="object-contain w-full h-full bg-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
