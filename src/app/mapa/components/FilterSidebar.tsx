'use client';

import { Check } from 'lucide-react';
import { FilterState, ProductType, PRODUCT_LABELS, PRODUCT_COLORS } from './types';
import { municipalities } from '@/data/producers';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const allProducts: ProductType[] = ['cafe', 'cacao', 'platano', 'arroz', 'palma', 'mango', 'ganaderia'];

const certificationOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'certified', label: 'Certificados' },
  { value: 'in-progress', label: 'En proceso' },
  { value: 'none', label: 'Sin certificación' },
] as const;

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const toggleProduct = (product: ProductType) => {
    const newProducts = filters.products.includes(product)
      ? filters.products.filter((p) => p !== product)
      : [...filters.products, product];
    onFiltersChange({ ...filters, products: newProducts });
  };

  const handleMunicipalityChange = (municipality: string) => {
    onFiltersChange({ ...filters, municipality });
  };

  const handleCertificationChange = (certified: FilterState['certified']) => {
    onFiltersChange({ ...filters, certified });
  };

  const clearFilters = () => {
    onFiltersChange({
      products: [],
      certified: 'all',
      municipality: 'Todos',
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.products.length > 0 || filters.certified !== 'all' || filters.municipality !== 'Todos';

  return (
    <aside className="w-80 bg-white shadow-xl flex flex-col h-full shrink-0">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
        <h2 className="font-heading font-bold text-lg text-gray-800">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#6D9E13] hover:text-[#4A7010] font-medium"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Producto</h3>
          <div className="space-y-2">
            {allProducts.map((product) => {
              const isSelected = filters.products.includes(product);
              return (
                <button
                  key={product}
                  onClick={() => toggleProduct(product)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-[#6D9E13]/10 border border-[#6D9E13]/30'
                      : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: PRODUCT_COLORS[product] + '20' }}
                  >
                    <img
                      src={`/icons/${product}.svg`}
                      alt={PRODUCT_LABELS[product]}
                      className="w-5 h-5"
                    />
                  </div>
                  <span className={`flex-1 text-left text-sm font-medium ${isSelected ? 'text-[#6D9E13]' : 'text-gray-700'}`}>
                    {PRODUCT_LABELS[product]}
                  </span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#6D9E13] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Municipio</h3>
          <div className="space-y-1">
            {municipalities.map((municipality) => {
              const isSelected = filters.municipality === municipality;
              return (
                <button
                  key={municipality}
                  onClick={() => handleMunicipalityChange(municipality)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isSelected
                      ? 'bg-[#6D9E13] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {municipality}
                </button>
              );
            })}
          </div>
        </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Certificación RA</h3>
            <div className="space-y-1">
              {certificationOptions.map((option) => {
                const isSelected = filters.certified === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleCertificationChange(option.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#6D9E13] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Agroturismo</h3>
            <button
              onClick={() => {}}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors bg-cyan-50 border border-cyan-200"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#00BCD4]/20">
                <span className="text-[#00BCD4] text-lg font-bold">🌿</span>
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-cyan-800">Puntos de agroturismo</span>
                <p className="text-xs text-cyan-600">Fincas abiertas al turismo</p>
              </div>
              <span className="text-xs bg-[#00BCD4] text-white px-2 py-0.5 rounded-full font-medium">
                5
              </span>
            </button>
            <p className="text-xs text-gray-400 mt-1.5 px-2">
              Usa el panel de Capas para mostrar/ocultar puntos de agroturismo en el mapa.
            </p>
          </div>
      </div>
    </aside>
  );
}
