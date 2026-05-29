"use client";

import { motion } from "framer-motion";
import { Sprout, ShoppingCart, QrCode, Package, MapPin, Shield, TrendingUp, BarChart2 } from "lucide-react";

const producerFeatures = [
  { icon: Sprout, title: "Gestionar Cosechas", desc: "Registra lotes y cultivos" },
  { icon: MapPin, title: "Visibilidad Regional", desc: "Llega a compradores" },
  { icon: QrCode, title: "Pasaporte Digital", desc: "Trazabilidad completa" },
  { icon: Shield, title: "Certificaciones", desc: "Fairtrade, Rainforest" },
];

const buyerFeatures = [
  { icon: ShoppingCart, title: "Explorar Productos", desc: "Catalogo completo" },
  { icon: QrCode, title: "Escanear QR", desc: "Verificar origen" },
  { icon: Shield, title: "Traceabilidad", desc: "Datos verificables" },
  { icon: BarChart2, title: "Analisis de Calidad", desc: "Datos del lote" },
];

export function RoleComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#6D9E13]/8 to-[#DEDB8D]/20 rounded-2xl p-6 md:p-8 border-2 border-[#6D9E13]/15"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#6D9E13] flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-[#4A7010]">Productor</h3>
            <p className="text-xs text-gray-500">Panel de Gestion</p>
          </div>
        </div>
        <div className="space-y-3">
          {producerFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                <feature.icon className="w-4 h-4 text-[#6D9E13]" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">{feature.title}</p>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-to-br from-[#82640B]/8 to-[#DEDB8D]/20 rounded-2xl p-6 md:p-8 border-2 border-[#82640B]/15"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#82640B] flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-[#82640B]">Comprador</h3>
            <p className="text-xs text-gray-500">Panel de Traceabilidad</p>
          </div>
        </div>
        <div className="space-y-3">
          {buyerFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                <feature.icon className="w-4 h-4 text-[#82640B]" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">{feature.title}</p>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
