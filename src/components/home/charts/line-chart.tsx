"use client";

import { motion } from "framer-motion";

interface LineChartProps {
  data: { label: string; current: number; projected: number }[];
  height?: number;
}

export function LineChart({ data, height = 280 }: LineChartProps) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 600;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = data.flatMap((d) => [d.current, d.projected]);
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = Math.min(...allValues) * 0.9;
  const range = maxValue - minValue;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) => padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

  const currentPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.current)}`).join(" ");
  const projectedPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.projected)}`).join(" ");

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: padding.top + chartHeight * (1 - ratio),
    value: Math.round(minValue + range * ratio),
  }));

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[600px] mx-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {gridLines.map((line, i) => (
          <g key={i}>
            <line x1={padding.left} y1={line.y} x2={width - padding.right} y2={line.y} className="stroke-gray-200" strokeWidth="1" />
            <text x={padding.left - 8} y={line.y + 4} textAnchor="end" className="fill-gray-500 text-[10px]">
              {line.value}%
            </text>
          </g>
        ))}

        <motion.path
          d={currentPath}
          fill="none"
          stroke="#6D9E13"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />

        {data.map((d, i) => (
          <motion.circle
            key={`current-${i}`}
            cx={getX(i)}
            cy={getY(d.current)}
            r="5"
            fill="#6D9E13"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
          />
        ))}

        <motion.path
          d={projectedPath}
          fill="none"
          stroke="#82640B"
          strokeWidth="3"
          strokeDasharray="8,4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {data.map((d, i) => (
          <motion.circle
            key={`projected-${i}`}
            cx={getX(i)}
            cy={getY(d.projected)}
            r="5"
            fill="#82640B"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          />
        ))}

        {data.map((d, i) => (
          <text key={`label-${i}`} x={getX(i)} y={height - 10} textAnchor="middle" className="fill-gray-600 text-xs font-medium">
            {d.label}
          </text>
        ))}
      </svg>

      <div className="flex justify-center gap-8 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#6D9E13] rounded" />
          <span className="text-sm text-gray-600">ROI Actual (Local)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-0.5 rounded"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, #82640B 0, #82640B 8px, transparent 8px, transparent 12px)",
            }}
          />
          <span className="text-sm text-gray-600">ROI Proyectado (Exportacion)</span>
        </div>
      </div>
    </div>
  );
}
