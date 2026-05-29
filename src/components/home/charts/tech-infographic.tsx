"use client";

import { motion } from "framer-motion";
import { Cloud, Database, Monitor, Wifi, Lock, Zap } from "lucide-react";

const stackLayers = [
  {
    icon: Monitor,
    name: "Frontend",
    tech: "Next.js 15 + React 19",
    color: "#6D9E13",
    latency: "< 100ms",
    features: ["Responsive UI", "PWA Ready", "SSR/SSG"],
  },
  {
    icon: Cloud,
    name: "Cloud",
    tech: "AWS / Vercel Edge",
    color: "#1565C0",
    latency: "< 50ms",
    features: ["CDN Global", "Auto Scaling", "99.9% Uptime"],
  },
  {
    icon: Database,
    name: "Database",
    tech: "PostgreSQL + Redis",
    color: "#82640B",
    latency: "< 20ms",
    features: ["ACID Compliant", "Real-time Sync", "Encrypted"],
  },
  {
    icon: Lock,
    name: "Security",
    tech: "OAuth + JWT",
    color: "#2E7D32",
    latency: "< 30ms",
    features: ["Export Ready", "Audit Trail", "Certifications"],
  },
  {
    icon: Wifi,
    name: "IoT",
    tech: "MQTT + WebSocket",
    color: "#9C27B0",
    latency: "< 10ms",
    features: ["Sensors", "Weather API", "GPS Tracking"],
  },
];

export function TechInfographic() {
  return (
    <div className="relative overflow-x-auto">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: 0 }}>
        <defs>
          <linearGradient id="stackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6D9E13" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6D9E13" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {stackLayers.map((layer, index) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                style={{ backgroundColor: `${layer.color}18` }}
              >
                <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
              </div>

              <h4 className="font-heading font-bold text-center text-sm text-gray-900 mb-0.5">
                {layer.name}
              </h4>
              <p className="text-[10px] text-center text-gray-500 mb-2">{layer.tech}</p>

              <div className="flex items-center justify-center gap-1 mb-3">
                <Zap className="w-3 h-3 text-[#6D9E13]" />
                <span className="text-[10px] font-semibold text-[#6D9E13]">{layer.latency}</span>
              </div>

              <div className="space-y-1">
                {layer.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5 text-[10px] text-gray-600">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {index < stackLayers.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                <svg className="w-6 h-4 text-gray-300" viewBox="0 0 24 16" fill="none">
                  <path d="M0 8h20M16 3l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
