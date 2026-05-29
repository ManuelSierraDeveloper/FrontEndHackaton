"use client";

import { motion } from "framer-motion";

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  showValues?: boolean;
  prefix?: string;
  suffix?: string;
  format?: "number" | "currency" | "percent";
}

export function BarChart({ data, maxValue, showValues = true, prefix = "$", format = "number" }: BarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value));
  const defaultColors = ["#6D9E13", "#82640B", "#DEDB8D", "#4A7010", "#1565C0"];

  const formatValue = (val: number) => {
    if (format === "currency") {
      return `${prefix}${val.toLocaleString("es-CO")}`;
    }
    if (format === "percent") {
      return `${val}%`;
    }
    return val.toLocaleString("es-CO");
  };

  return (
    <div className="w-full space-y-4">
      {data.map((item, index) => {
        const percentage = (item.value / max) * 100;
        const color = item.color || defaultColors[index % defaultColors.length];

        return (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              {showValues && (
                <span className="text-sm font-bold" style={{ color }}>
                  {formatValue(item.value)}
                </span>
              )}
            </div>
            <div className="h-10 bg-gray-100 rounded-lg overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="h-full rounded-lg flex items-center justify-end pr-4"
                style={{ backgroundColor: color }}
              >
                {percentage > 15 && (
                  <span className="text-white text-xs font-bold">
                    {item.value}%
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
