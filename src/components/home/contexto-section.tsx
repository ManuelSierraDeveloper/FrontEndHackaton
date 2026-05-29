"use client";

import { motion } from "framer-motion";
import { TrendingUp, Building2, Users, Database } from "lucide-react";
import { PieChart } from "./charts";

const enterpriseData = [
  { label: "Microempresas (1-9 empleados)", value: 92, color: "#6D9E13" },
  { label: "Pequeñas Empresas (10-49)", value: 6, color: "#82640B" },
  { label: "Medianas Empresas (50-199)", value: 1.5, color: "#DEDB8D" },
  { label: "Grandes Empresas (200+)", value: 0.5, color: "#4A7010" },
];

const stats = [
  { icon: Building2, value: "92%", label: "Son microempresas", color: "#6D9E13" },
  { icon: TrendingUp, value: "38%", label: "Del PIB departamental", color: "#82640B" },
  { icon: Users, value: "85%", label: "Brecha digital por cerrar", color: "#1565C0" },
];

const dataStats = [
  { icon: Database, value: "2.5M", label: "Empresas registradas", color: "#6D9E13" },
  { icon: Building2, value: "38%", label: "Del PIB del Magdalena", color: "#82640B" },
  { icon: Users, value: "85%", label: "Sin acceso digital", color: "#1565C0" },
];

export function ContextoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FFFAF3]">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6D9E13]/10 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-[#6D9E13]" />
            <span className="text-sm font-semibold text-[#6D9E13]">Contexto Regional</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            La Realidad Rural del Magdalena
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            El agro es el motor economico del departamento, pero la transformacion digital apenas comienza. El tejido empresarial colombiano es predominantemente micro.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-4">
            {dataStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.color}18` }}
                >
                  <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="font-heading font-bold text-3xl" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-[#6D9E13]/5 rounded-xl border border-[#6D9E13]/15"
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-[#6D9E13]">Fuente:</span> Confecamaras, Registro Mercantil 2024.
                El 92% de empresas registradas son microempresas, muchas en el sector agricola del Magdalena.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
          >
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-2 text-center">
              Composicion de Empresas en Colombia
            </h3>
            <p className="text-xs text-gray-500 text-center mb-6">
              Segmentacion por tamano en el ecosistema agro
            </p>
            <PieChart data={enterpriseData} size={220} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
