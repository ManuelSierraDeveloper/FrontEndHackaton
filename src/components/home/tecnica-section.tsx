"use client";

import { motion } from "framer-motion";
import { Cpu, Cloud, Lock, BarChart, ArrowRight } from "lucide-react";
import { TechInfographic } from "./charts";

const pilarData = [
  {
    icon: Cpu,
    title: "Descentralizacion de datos",
    desc: "La informacion vive en la nube, no en manos de intermediarios. El productor controla su propia data.",
    color: "#6D9E13",
  },
  {
    icon: Cloud,
    title: "Escalabilidad en la nube",
    desc: "AWS + Vercel Edge garantizan que la plataforma crezca contigo, sin limites de usuarios ni transacciones.",
    color: "#1565C0",
  },
  {
    icon: Lock,
    title: "Seguridad para exportacion",
    desc: "Cumplimiento de estandares internacionales de trazabilidad para acceder a mercados de USA, Europa y Asia.",
    color: "#82640B",
  },
  {
    icon: BarChart,
    title: "Dashboards de precision",
    desc: "Reduce costos operativos y optimiza insumos con agricultura 4.0 y analisis en tiempo real.",
    color: "#9C27B0",
  },
];

export function TecnicaSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
            <Cpu className="w-4 h-4 text-[#1565C0]" />
            <span className="text-sm font-semibold text-[#1565C0]">Motor Tecnico</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            El Motor de Eficiencia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Un stack tecnologico disenado para la agricultura moderna. Latencia cero en la toma de decisiones y seguridad de grado exportador.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pilarData.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${item.color}18` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <h4 className="font-heading font-bold text-sm text-gray-900 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-8 text-center">
            Arquitectura de la Plataforma
          </h3>
          <TechInfographic />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-5 bg-[#6D9E13]/5 rounded-xl border border-[#6D9E13]/15 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-[#6D9E13] flex items-center justify-center shrink-0">
            <BarChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900 mb-1">Agricultura 4.0</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              La descentralizacion de la informacion es vital. Cuando cada lote tiene su propio "pasaporte" digital,
              el productor deja de depender de intermediarios para demostrar calidad. La data la controla el que la genera.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
