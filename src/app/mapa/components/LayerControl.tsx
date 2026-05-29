'use client';

import { Map, Satellite, TreePine } from 'lucide-react';

interface LayerControlProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayer: 'street' | 'satellite' | 'terrain';
  onLayerChange: (layer: 'street' | 'satellite' | 'terrain') => void;
  showCertified: boolean;
  onShowCertifiedChange: (show: boolean) => void;
  showAgrotourism?: boolean;
  onShowAgrotourismChange?: (show: boolean) => void;
}

const layers = [
  { id: 'street' as const, label: 'Mapa', icon: Map },
  { id: 'satellite' as const, label: 'Satélite', icon: Satellite },
  { id: 'terrain' as const, label: 'Terreno', icon: TreePine },
];

export default function LayerControl({
  isOpen,
  onClose,
  activeLayer,
  onLayerChange,
  showCertified,
  onShowCertifiedChange,
  showAgrotourism = true,
  onShowAgrotourismChange,
}: LayerControlProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 lg:hidden"
        onClick={onClose}
      />
      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-heading font-bold text-gray-800">Capas del mapa</h3>
        </div>

        <div className="p-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
              Estilo
            </p>
            <div className="space-y-1">
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => onLayerChange(layer.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeLayer === layer.id
                        ? 'bg-[#6D9E13] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
              Visualización
            </p>
            <button
              onClick={() => onShowCertifiedChange(!showCertified)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                showCertified
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-300 flex items-center justify-center">
                {showCertified && (
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                )}
              </span>
              Solo certificados RA
            </button>
            {onShowAgrotourismChange && (
              <button
                onClick={() => onShowAgrotourismChange(!showAgrotourism)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mt-1 ${
                  showAgrotourism
                    ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-cyan-300 flex items-center justify-center">
                  {showAgrotourism && (
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  )}
                </span>
                Puntos de agroturismo
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
