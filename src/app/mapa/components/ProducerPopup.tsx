'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Award, Package, Shield, ChevronRight, ArrowLeft, Send, Check } from 'lucide-react';
import { Producer, PRODUCT_LABELS, CertificationType } from './types';

interface ProducerPopupProps {
  producer: Producer;
}

const certificationLabels: Record<CertificationType, { label: string; color: string }> = {
  organic: { label: 'Orgánico', color: '#2D8B4E' },
  conventional: { label: 'Convencional', color: '#6B7280' },
  mixed: { label: 'Mixto', color: '#D97706' },
};

type ViewMode = 'summary' | 'details' | 'contact';

const typeLabels: Record<string, string> = {
  finca: 'Finca',
  granja: 'Granja',
  planta: 'Planta procesadora',
  cooperativa: 'Cooperativa',
};

export default function ProducerPopup({ producer }: ProducerPopupProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('summary');
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const { rainforestAlliance, traceability, representative, products } = producer;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactForm({ name: '', message: '' });
    }, 3000);
  };

  const isCertifiedRainforest = rainforestAlliance.certified;

  const headerContent = (
    <div className="bg-gradient-to-r from-[#6D9E13] to-[#4A7010] text-white p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <img
            src={`/icons/${products[0]?.type || 'cafe'}.svg`}
            alt={products[0]?.type || 'cafe'}
            className="w-8 h-8"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-lg leading-tight">{producer.name}</h3>
          <p className="text-white/70 text-xs">{typeLabels[producer.type] || producer.type}</p>
          <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{producer.municipality}, {producer.region}</span>
          </div>
        </div>
        {viewMode !== 'summary' && (
          <button
            onClick={() => setViewMode('summary')}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  if (viewMode === 'summary') {
    return (
      <div className="w-[340px] font-sans text-gray-800 overflow-hidden rounded-lg">
        {headerContent}

        <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />
              Representante
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium">{representative.name}</span>
                <span className="text-xs text-gray-500 shrink-0">({representative.role})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-3.5 h-3.5 text-[#6D9E13] shrink-0" />
                <a href={`tel:${representative.phone}`} className="text-[#4A7010] hover:underline truncate">
                  {representative.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-3.5 h-3.5 text-[#6D9E13] shrink-0" />
                <a href={`mailto:${representative.email}`} className="text-[#4A7010] hover:underline truncate">
                  {representative.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />
              Productos ({products.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {products.map((product, index) => {
                const cert = certificationLabels[product.certification];
                return (
                  <div key={index} className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1">
                    <img src={`/icons/${product.type}.svg`} alt={PRODUCT_LABELS[product.type]} className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium">{PRODUCT_LABELS[product.type]}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full text-white shrink-0" style={{ backgroundColor: cert.color }}>
                      {cert.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />
              Certificación Rainforest Alliance
            </h4>
            <div className={`rounded-lg p-3 ${isCertifiedRainforest ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              {isCertifiedRainforest ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#2D8B4E] shrink-0" />
                    <span className="font-semibold text-[#2D8B4E] text-sm">CERTIFICADO</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium">{rainforestAlliance.score}/100</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">Válido hasta {new Date(rainforestAlliance.validUntil).toLocaleDateString('es-CO')}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-medium text-amber-800 text-sm">Sin certificación</p>
                    <p className="text-xs text-amber-600">En proceso de auditoría</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />
              Trazabilidad
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div>
                <span className="text-gray-500">Lotes</span>
                <p className="font-semibold">{traceability.lotsThisYear}</p>
              </div>
              <div>
                <span className="text-gray-500">Rendimiento</span>
                <p className="font-medium">{traceability.yieldPerHectare}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setViewMode('details')}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#6D9E13] text-white text-xs font-medium py-2 rounded-lg hover:bg-[#4A7010] transition-colors"
            >
              <Package className="w-3.5 h-3.5" />
              Ver detalles
            </button>
            <button
              onClick={() => setViewMode('contact')}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#6D9E13] text-[#6D9E13] text-xs font-medium py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              Contactar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'details') {
    return (
      <div className="w-[380px] font-sans text-gray-800 overflow-hidden rounded-lg">
        {headerContent}

        <div className="p-4 space-y-5 max-h-[420px] overflow-y-auto">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Ubicación
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-sm">
              <p className="font-medium">{producer.address}</p>
              <p className="text-gray-500">{producer.municipality}, {producer.region}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Representante
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <p className="text-sm font-semibold">{representative.name}</p>
              <p className="text-xs text-gray-500">{representative.role}</p>
              <div className="flex flex-col gap-1.5 pt-1">
                <a href={`tel:${representative.phone}`} className="flex items-center gap-2 text-sm text-[#4A7010] hover:bg-green-50 rounded px-2 py-1.5 -mx-2 transition-colors">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {representative.phone}
                </a>
                <a href={`mailto:${representative.email}`} className="flex items-center gap-2 text-sm text-[#4A7010] hover:bg-green-50 rounded px-2 py-1.5 -mx-2 transition-colors">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {representative.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Productos
            </h4>
            <div className="space-y-2">
              {products.map((product, index) => {
                const cert = certificationLabels[product.certification];
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={`/icons/${product.type}.svg`} alt={PRODUCT_LABELS[product.type]} className="w-6 h-6 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{PRODUCT_LABELS[product.type]}</p>
                        {product.variety && <p className="text-xs text-gray-500">{product.variety}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: cert.color }}>
                        {cert.label}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">{product.annualProduction}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {isCertifiedRainforest && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Certificación
              </h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#2D8B4E] shrink-0" />
                  <span className="font-semibold text-[#2D8B4E] text-sm">Rainforest Alliance</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="text-gray-500">ID</span>
                    <p className="font-medium">{rainforestAlliance.certificationId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Válido hasta</span>
                    <p className="font-medium">{new Date(rainforestAlliance.validUntil).toLocaleDateString('es-CO')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Área certificada</span>
                    <p className="font-medium">{rainforestAlliance.certifiedArea}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Puntaje</span>
                    <p className="font-medium text-[#2D8B4E] text-lg">{rainforestAlliance.score}/100</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Última auditoría</span>
                    <p className="font-medium">{new Date(rainforestAlliance.auditDate).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Trazabilidad
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <span className="text-gray-500">Lotes este año</span>
                <p className="font-semibold">{traceability.lotsThisYear}</p>
              </div>
              <div>
                <span className="text-gray-500">Metodología</span>
                <p className="font-medium capitalize">{traceability.methodology}</p>
              </div>
              <div>
                <span className="text-gray-500">Rendimiento</span>
                <p className="font-medium">{traceability.yieldPerHectare}</p>
              </div>
              <div>
                <span className="text-gray-500">Última inspección</span>
                <p className="font-medium">{new Date(traceability.lastInspection).toLocaleDateString('es-CO')}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Temporadas de cosecha</span>
                <p className="font-medium">{traceability.harvestSeasons.join(', ')}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setViewMode('contact')}
            className="w-full flex items-center justify-center gap-2 bg-[#6D9E13] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4A7010] transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contactar al productor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[380px] font-sans text-gray-800 overflow-hidden rounded-lg">
      {headerContent}

      <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Contacto directo
          </h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
            <p className="text-sm font-semibold">{representative.name}</p>
            <p className="text-xs text-gray-500">{representative.role}</p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${representative.phone}`}
                className="flex items-center gap-3 p-2.5 bg-[#6D9E13] text-white rounded-lg hover:bg-[#4A7010] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <div className="text-left">
                  <p className="text-sm font-medium">Llamar</p>
                  <p className="text-xs text-white/80">{representative.phone}</p>
                </div>
              </a>
              <div className="flex gap-2">
                <a
                  href={`mailto:${representative.email}`}
                  className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white border border-[#6D9E13] text-[#6D9E13] rounded-lg hover:bg-green-50 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href={`https://wa.me/${representative.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#1fb855] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-[#6D9E13] rounded-full" />Enviar mensaje
          </h4>
          {formSent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">Mensaje enviado</p>
              <p className="text-xs text-green-600 mt-1">El productor se contactará pronto</p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="bg-gray-50 rounded-lg p-3 space-y-3">
              <div>
                <label htmlFor="msg-name" className="block text-xs font-medium text-gray-600 mb-1">
                  Tu nombre
                </label>
                <input
                  id="msg-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#6D9E13] focus:ring-1 focus:ring-[#6D9E13]/20 outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="msg-body" className="block text-xs font-medium text-gray-600 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="msg-body"
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder={`Hola, me interesan sus productos de ${PRODUCT_LABELS[products[0].type]}...`}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#6D9E13] focus:ring-1 focus:ring-[#6D9E13]/20 outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#6D9E13] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4A7010] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
