"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  Star,
  Shield,
  Package,
  Sprout,
  ArrowRight,
  Store,
  TrendingUp,
  Globe,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProducerRegistrationModal } from "@/components/seller";

const productores = [
  {
    id: 1,
    name: "Cooperativa Agricola del Magdalena",
    location: "Santa Marta",
    products: ["Guineo", "Cafe", "Cacao"],
    certifications: ["fairtrade", "rainforest"],
    rating: 4.9,
    description:
      "Cooperativa con mas de 20 anos de experiencia exportando guineo verde y cafe organico.",
    verified: true,
    productCount: 12,
  },
  {
    id: 2,
    name: "Finca El Paraiso",
    location: "Minca",
    products: ["Cafe", "Miel"],
    certifications: ["organic"],
    rating: 4.8,
    description:
      "Finca familiar especializada en cafe de altura cultivado bajo sombra en la Sierra Nevada.",
    verified: true,
    productCount: 5,
  },
  {
    id: 3,
    name: "Agroindustrias del Caribe",
    location: "Fundacion",
    products: ["Cacao", "Naranja", "Aguacate"],
    certifications: ["rainforest", "fairtrade"],
    rating: 4.7,
    description:
      "Empresa dedicada a la produccion y exportacion de cacao fino de aroma.",
    verified: true,
    productCount: 8,
  },
  {
    id: 4,
    name: "Hacienda Santa Elena",
    location: "Cienaga",
    products: ["Guineo", "Tomate", "Yuca"],
    certifications: [],
    rating: 4.5,
    description:
      "Productores tradicionales de la region bananera con productos frescos de temporada.",
    verified: false,
    productCount: 6,
  },
  {
    id: 5,
    name: "Asociacion de Caficultores Sierra Nevada",
    location: "Aracataca",
    products: ["Cafe"],
    certifications: ["fairtrade", "rainforest", "organic"],
    rating: 5.0,
    description:
      "Asociacion que agrupa a 45 familias caficultoras de la Sierra Nevada de Santa Marta.",
    verified: true,
    productCount: 3,
  },
  {
    id: 6,
    name: "Finca Los Mangos",
    location: "Pivijay",
    products: ["Yuca", "Guineo", "Maiz"],
    certifications: ["fairtrade"],
    rating: 4.4,
    description:
      "Finca diversificada con cultivos de pancoger y productos para el mercado local y nacional.",
    verified: false,
    productCount: 9,
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Vende directo",
    description: "Sin intermediarios. Tu precio, tu ganancia.",
  },
  {
    icon: Globe,
    title: "Alcance global",
    description: "Llega a compradores nacionales e internacionales.",
  },
  {
    icon: Shield,
    title: "Trazabilidad",
    description: "Certificaciones y origen verificable para tus productos.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const certificationBadge = (cert: string) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    fairtrade: { bg: "#FFF3E0", text: "#E65100", label: "Fairtrade" },
    rainforest: { bg: "#E8F5E9", text: "#2E7D32", label: "Rainforest" },
    organic: { bg: "#E3F2FD", text: "#1565C0", label: "Organico" },
  };
  const c = config[cert];
  if (!c) return null;
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded font-medium border"
      style={{ backgroundColor: c.bg, color: c.text, borderColor: c.bg }}
    >
      {c.label}
    </span>
  );
};

export default function ProductoresPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 bg-[#FFFAF3]">
      <section className="relative bg-gradient-to-br from-[#6D9E13] to-[#4A7010] py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-5 h-5 text-[#DEDB8D]" />
              <span className="text-[#DEDB8D] text-sm font-medium">
                Magdalena, Colombia
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
              Productores del Magdalena
            </h1>
            <p className="text-white/80 max-w-lg text-base md:text-lg leading-relaxed">
              Conoce a los productores que cultivan los mejores productos
              agricolas de la region. Directo del campo a tu mesa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#6D9E13] font-bold rounded-lg hover:bg-gray-50 transition-all shadow-lg active:scale-[0.98]"
            >
              <Store className="w-5 h-5" />
              Convertirme en productor
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              <Package className="w-5 h-5" />
              Explorar tienda
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#DEDB8D]/40 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#6D9E13]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {benefit.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-900">
              Productores destacados
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {productores.length} productores verificados en la region
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {productores.map((producer) => (
            <motion.div
              key={producer.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#6D9E13]/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#DEDB8D] flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#6D9E13]" />
                  </div>
                  {producer.verified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-[#4CAF50]/10 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#4CAF50]" />
                      <span className="text-[10px] font-medium text-[#4CAF50]">
                        Verificado
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {producer.rating}
                  </span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-lg text-gray-900 mb-1 group-hover:text-[#6D9E13] transition-colors">
                {producer.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {producer.location}
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                {producer.description}
              </p>

              <div className="flex gap-1 mb-3 flex-wrap">
                {producer.certifications.map((cert) => (
                  <span key={cert}>{certificationBadge(cert)}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {producer.products.map((p) => (
                  <span
                    key={p}
                    className="px-2 py-0.5 bg-[#DEDB8D]/40 text-[#4A7010] text-xs font-medium rounded-full"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {producer.productCount} productos
                </span>
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#6D9E13] hover:text-[#4A7010] transition-colors group/link"
                >
                  Ver productos
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#6D9E13] to-[#4A7010] rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#DEDB8D]" />
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3">
            ¿Tienes una finca?
          </h3>
          <p className="text-white/80 max-w-md mx-auto mb-6">
            Unete a nuestra red de productores y lleva tus productos a miles de
            compradores. Registro gratuito y sin comisiones iniciales.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#6D9E13] font-bold rounded-lg hover:bg-gray-50 transition-all shadow-lg active:scale-[0.98]"
          >
            <Store className="w-5 h-5" />
            Comenzar ahora
          </button>
        </motion.div>
      </section>

      <ProducerRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
