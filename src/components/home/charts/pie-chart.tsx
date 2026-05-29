"use client";

import { motion } from "framer-motion";

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  showLabel?: boolean;
}

export function PieChart({ data, size = 200, showLabel = true }: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const center = size / 2;
  const radius = size / 2 - 10;

  let currentAngle = -90;

  const slices = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...item,
      path: `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      percentage: Math.round((item.value / total) * 100),
    };
  });

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g>
            {slices.map((slice, i) => (
              <motion.path
                key={slice.label}
                d={slice.path}
                fill={slice.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="hover:brightness-110 transition-all cursor-pointer"
              />
            ))}
          </g>
          <circle cx={center} cy={center} r={size * 0.28} fill="white" />
          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            className="fill-gray-900 font-bold text-lg"
            style={{ fontFamily: "inherit" }}
          >
            {total.toLocaleString("es-CO")}%
          </text>
          <text x={center} y={center + 12} textAnchor="middle" className="fill-gray-500 text-xs">
            Total empresas
          </text>
        </svg>
      </div>

      {showLabel && (
        <div className="flex flex-col gap-3">
          {slices.map((slice, i) => (
            <motion.div
              key={slice.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-4 h-4 rounded-sm shrink-0" style={{ backgroundColor: slice.color }} />
              <span className="text-sm text-gray-700">{slice.label}</span>
              <span className="text-sm font-semibold text-gray-900 ml-auto ml-2">{slice.percentage}%</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
