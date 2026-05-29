'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Producer, FilterState, ProductType, PRODUCT_COLORS, AgrotourismPoint, AGROTOURISM_COLOR } from './types';
import ProducerPopup from './ProducerPopup';
import AgrotourismPopup from './AgrotourismPopup';
import 'leaflet/dist/leaflet.css';

const MAGDALENA_CENTER: [number, number] = [10.8, -74.15];
const DEFAULT_ZOOM = 9;
const SELECTED_ZOOM = 12;

const TILE_LAYERS = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>',
  },
};

const createCustomIcon = (productType: ProductType, isCertified: boolean, isSelected: boolean = false) => {
  const color = PRODUCT_COLORS[productType];
  const borderColor = isSelected ? '#FF0000' : isCertified ? '#FFD700' : '#fff';
  const borderWidth = isSelected ? 4 : isCertified ? 4 : 3;
  const scale = isSelected ? 1.2 : 1;

  const iconHtml = `
    <div style="
      width: ${48 * scale}px;
      height: ${48 * scale}px;
      border-radius: 50%;
      border: ${borderWidth}px solid ${borderColor};
      box-shadow: 0 4px 12px rgba(0,0,0,${isSelected ? 0.4 : 0.3});
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${color};
      transition: all 0.2s ease;
      transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
    ">
      <img src="/icons/${productType}.svg" width="${28 * scale}" height="${28 * scale}" alt="${productType}" style="object-fit: contain;" />
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [48 * scale, 48 * scale],
    iconAnchor: [24 * scale, 24 * scale],
    popupAnchor: [0, -24 * scale],
  });
};

const createAgrotourismIcon = (isSelected: boolean = false) => {
  const color = AGROTOURISM_COLOR;
  const borderColor = isSelected ? '#FF0000' : '#fff';
  const borderWidth = isSelected ? 4 : 3;
  const scale = isSelected ? 1.2 : 1;

  const iconHtml = `
    <div style="
      width: ${48 * scale}px;
      height: ${48 * scale}px;
      border-radius: 50%;
      border: ${borderWidth}px solid ${borderColor};
      box-shadow: 0 4px 12px rgba(0,0,0,${isSelected ? 0.4 : 0.3});
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${color};
      transition: all 0.2s ease;
      transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
    ">
      <svg width="${28 * scale}" height="${28 * scale}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 8c1 0 3 1 3 3s-1 3-3 3"/>
        <path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
        <path d="M12 2v10"/>
        <path d="M9 6l3-3 3 3"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-agrotourism',
    iconSize: [48 * scale, 48 * scale],
    iconAnchor: [24 * scale, 24 * scale],
    popupAnchor: [0, -24 * scale],
  });
};

interface MapViewProps {
  producers: Producer[];
  agrotourismPoints?: AgrotourismPoint[];
  filters: FilterState;
  selectedProducerId?: string | null;
  selectedAgrotourismId?: string | null;
  onProducerClick?: (producerId: string) => void;
  onAgrotourismClick?: (agrotourismId: string) => void;
  activeLayer?: 'street' | 'satellite' | 'terrain';
  showOnlyCertified?: boolean;
  showAgrotourism?: boolean;
}

function MapController({
  filteredProducers,
  selectedProducerId,
  selectedProducerCoords,
  filteredAgrotourism,
  selectedAgrotourismId,
  selectedAgrotourismCoords,
}: {
  filteredProducers: Producer[];
  selectedProducerId?: string | null;
  selectedProducerCoords?: { lat: number; lng: number } | null;
  filteredAgrotourism?: AgrotourismPoint[];
  selectedAgrotourismId?: string | null;
  selectedAgrotourismCoords?: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  const prevSelectedId = useRef<string | null>(null);
  const hasInitiallyFitBounds = useRef(false);

  useEffect(() => {
    if (selectedAgrotourismId && selectedAgrotourismCoords) {
      if (prevSelectedId.current !== selectedAgrotourismId) {
        map.flyTo([selectedAgrotourismCoords.lat, selectedAgrotourismCoords.lng], SELECTED_ZOOM, {
          duration: 1,
        });
        prevSelectedId.current = selectedAgrotourismId;
      }
    } else if (selectedProducerId && selectedProducerCoords) {
      if (prevSelectedId.current !== selectedProducerId) {
        map.flyTo([selectedProducerCoords.lat, selectedProducerCoords.lng], SELECTED_ZOOM, {
          duration: 1,
        });
        prevSelectedId.current = selectedProducerId;
      }
    } else if (filteredProducers.length > 0 && !hasInitiallyFitBounds.current) {
      const points: [number, number][] = filteredProducers.map((p) => [p.coordinates.lat, p.coordinates.lng]);
      if (filteredAgrotourism) {
        filteredAgrotourism.forEach((ap) => {
          points.push([ap.coordinates.lat, ap.coordinates.lng]);
        });
      }
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      hasInitiallyFitBounds.current = true;
    }
  }, [filteredProducers, selectedProducerId, selectedProducerCoords, filteredAgrotourism, selectedAgrotourismId, selectedAgrotourismCoords, map]);

  return null;
}

export default function MapView({
  producers,
  agrotourismPoints = [],
  filters,
  selectedProducerId,
  selectedAgrotourismId,
  onProducerClick,
  onAgrotourismClick,
  activeLayer = 'street',
  showOnlyCertified = false,
  showAgrotourism = true,
}: MapViewProps) {
  const filteredProducers = useMemo(() => {
    return producers.filter((producer) => {
      if (showOnlyCertified && !producer.rainforestAlliance.certified) {
        return false;
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          producer.name.toLowerCase().includes(query) ||
          producer.municipality.toLowerCase().includes(query) ||
          producer.representative.name.toLowerCase().includes(query) ||
          producer.products.some((p) => p.type.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (filters.products.length > 0) {
        const hasProduct = producer.products.some((p) =>
          filters.products.includes(p.type)
        );
        if (!hasProduct) return false;
      }

      if (filters.municipality && filters.municipality !== 'Todos') {
        if (producer.municipality !== filters.municipality) return false;
      }

      if (filters.certified !== 'all') {
        if (filters.certified === 'certified' && !producer.rainforestAlliance.certified) {
          return false;
        }
        if (filters.certified === 'in-progress' && producer.rainforestAlliance.certified) {
          return false;
        }
        if (filters.certified === 'none' && producer.rainforestAlliance.certified) {
          return false;
        }
      }

      return true;
    });
  }, [producers, filters, showOnlyCertified]);

  const selectedProducer = useMemo(() => {
    return producers.find((p) => p.id === selectedProducerId) || null;
  }, [producers, selectedProducerId]);

  const selectedAgrotourism = useMemo(() => {
    return agrotourismPoints.find((ap) => ap.id === selectedAgrotourismId) || null;
  }, [agrotourismPoints, selectedAgrotourismId]);

  const getPrimaryProduct = (producer: Producer): ProductType => {
    return producer.products[0]?.type || 'cafe';
  };

  const tileLayer = TILE_LAYERS[activeLayer];

  return (
    <MapContainer
      center={MAGDALENA_CENTER}
      zoom={DEFAULT_ZOOM}
      className="w-full h-full relative z-[1]"
      scrollWheelZoom={true}
      zoomControl={true}
      closePopupOnClick={true}
    >
      <TileLayer
        attribution={tileLayer.attribution}
        url={tileLayer.url}
      />
      <MapController
        filteredProducers={filteredProducers}
        selectedProducerId={selectedProducerId}
        selectedProducerCoords={selectedProducer?.coordinates}
        filteredAgrotourism={agrotourismPoints}
        selectedAgrotourismId={selectedAgrotourismId}
        selectedAgrotourismCoords={selectedAgrotourism?.coordinates}
      />
      {filteredProducers.map((producer) => {
        const primaryProduct = getPrimaryProduct(producer);
        const isSelected = producer.id === selectedProducerId;
        return (
          <Marker
            key={producer.id}
            position={[producer.coordinates.lat, producer.coordinates.lng]}
            icon={createCustomIcon(primaryProduct, producer.rainforestAlliance.certified, isSelected)}
            eventHandlers={{
              click: () => onProducerClick?.(producer.id),
            }}
          >
            <Popup
              className="producer-popup"
              maxWidth={360}
              autoPan={true}
              autoPanPaddingTopLeft={[50, 50]}
              autoPanPaddingBottomRight={[50, 50]}
            >
              <ProducerPopup producer={producer} />
            </Popup>
          </Marker>
        );
      })}
      {showAgrotourism && agrotourismPoints.filter((ap) => ap.active).map((point) => {
        const isSelected = point.id === selectedAgrotourismId;
        return (
          <Marker
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lng]}
            icon={createAgrotourismIcon(isSelected)}
            eventHandlers={{
              click: () => onAgrotourismClick?.(point.id),
            }}
          >
            <Popup
              className="agrotourism-popup"
              maxWidth={380}
              autoPan={true}
              autoPanPaddingTopLeft={[50, 50]}
              autoPanPaddingBottomRight={[50, 50]}
            >
              <AgrotourismPopup point={point} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
