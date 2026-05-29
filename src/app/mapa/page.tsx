'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Layers } from 'lucide-react';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import LayerControl from './components/LayerControl';
import { FilterState } from './components/types';
import { mockProducers } from '@/data/producers';
import { mockAgrotourism } from '@/data/agrotourism';

const MapView = dynamic(() => import('./components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#DEDB8D]/40 to-[#E3F2FD]/40">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#6D9E13] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    </div>
  ),
});

const defaultFilters: FilterState = {
  products: [],
  certified: 'all',
  municipality: 'Todos',
  searchQuery: '',
};

export default function MapaPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLayerOpen, setIsLayerOpen] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState<string | null>(null);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<'street' | 'satellite' | 'terrain'>('street');
  const [showOnlyCertified, setShowOnlyCertified] = useState(false);
  const [showAgrotourism, setShowAgrotourism] = useState(true);

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleProducerSelect = useCallback((producerId: string) => {
    setSelectedProducer(producerId);
    setSelectedAgrotourism(null);
  }, []);

  const handleAgrotourismSelect = useCallback((agrotourismId: string) => {
    setSelectedAgrotourism(agrotourismId);
    setSelectedProducer(null);
  }, []);

  const handleLayerChange = useCallback((layer: 'street' | 'satellite' | 'terrain') => {
    setActiveLayer(layer);
  }, []);

  const handleShowCertifiedChange = useCallback((show: boolean) => {
    setShowOnlyCertified(show);
  }, []);

  useEffect(() => {
    if (filters.searchQuery.trim().length > 0) {
      const matchingProducer = mockProducers.find(
        (p) => p.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
      if (matchingProducer) {
        setSelectedProducer(matchingProducer.id);
      } else {
        setSelectedProducer(null);
      }
    } else {
      setSelectedProducer(null);
    }
  }, [filters.searchQuery]);

  return (
    <div className="flex-1 flex bg-[#FFFAF3] relative overflow-hidden">
      <FilterSidebar
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="relative bg-[#FFFAF3] px-4 py-3 shrink-0">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row gap-3">
            <SearchBar
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar fincas, municipios, productos..."
            />
            <div className="flex gap-2 shrink-0 relative">
              <button
                onClick={() => setIsLayerOpen(!isLayerOpen)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-colors ${
                  isLayerOpen
                    ? 'bg-[#6D9E13] text-white'
                    : 'bg-white text-gray-700 hover:text-[#6D9E13]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">Capas</span>
              </button>

              <LayerControl
                isOpen={isLayerOpen}
                onClose={() => setIsLayerOpen(false)}
                activeLayer={activeLayer}
                onLayerChange={handleLayerChange}
                showCertified={showOnlyCertified}
                onShowCertifiedChange={handleShowCertifiedChange}
                showAgrotourism={showAgrotourism}
                onShowAgrotourismChange={setShowAgrotourism}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 relative overflow-hidden">
          <MapView
            producers={mockProducers}
            agrotourismPoints={mockAgrotourism}
            filters={filters}
            selectedProducerId={selectedProducer}
            selectedAgrotourismId={selectedAgrotourism}
            onProducerClick={handleProducerSelect}
            onAgrotourismClick={handleAgrotourismSelect}
            activeLayer={activeLayer}
            showOnlyCertified={showOnlyCertified}
            showAgrotourism={showAgrotourism}
          />
        </div>
      </div>
    </div>
  );
}
