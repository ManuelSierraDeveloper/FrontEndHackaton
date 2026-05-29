'use client';

import { useState } from 'react';
import {
  MapPin, Clock, Users, DollarSign, Phone, Mail, Star,
  TreePine, Coffee, Camera, Apple, Milk, Utensils, Bus,
  Hotel, User, Send, Check, Calendar, ChevronLeft
} from 'lucide-react';
import { AgrotourismPoint, AGROTOURISM_TYPE_LABELS } from './types';

interface AgrotourismPopupProps {
  point: AgrotourismPoint;
}

const activityIcons: Record<string, React.ReactNode> = {
  plant: <TreePine className="w-4 h-4" />,
  tree: <TreePine className="w-4 h-4" />,
  coffee: <Coffee className="w-4 h-4" />,
  harvest: <Apple className="w-4 h-4" />,
  camera: <Camera className="w-4 h-4" />,
  basket: <Apple className="w-4 h-4" />,
  apple: <Apple className="w-4 h-4" />,
  jar: <Utensils className="w-4 h-4" />,
  eye: <Camera className="w-4 h-4" />,
  milk: <Milk className="w-4 h-4" />,
  horse: <TreePine className="w-4 h-4" />,
  cheese: <Utensils className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  banana: <Apple className="w-4 h-4" />,
  water: <TreePine className="w-4 h-4" />,
  cake: <Utensils className="w-4 h-4" />,
};

type ViewMode = 'summary' | 'reserve';

export default function AgrotourismPopup({ point }: AgrotourismPopupProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('summary');
  const [reserveForm, setReserveForm] = useState({
    date: '',
    people: 1,
    schedule: 'mañana',
    transport: false,
    accommodation: false,
    notes: '',
    name: '',
    phone: '',
    email: '',
  });
  const [formSent, setFormSent] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmitReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setViewMode('summary');
      setReserveForm({
        date: '',
        people: 1,
        schedule: 'mañana',
        transport: false,
        accommodation: false,
        notes: '',
        name: '',
        phone: '',
        email: '',
      });
    }, 3000);
  };

  const starRating = point.rating ? Math.round(point.rating) : 0;

  const headerContent = (
    <div className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] text-white p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <TreePine className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              AGROTURISMO
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg leading-tight mt-0.5">{point.farmName}</h3>
          <p className="text-white/70 text-xs">{AGROTOURISM_TYPE_LABELS[point.type]}</p>
          <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{point.municipality}, {point.region}</span>
          </div>
        </div>
        {viewMode !== 'summary' && (
          <button
            onClick={() => setViewMode('summary')}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            title="Volver"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  if (viewMode === 'summary') {
    return (
      <div className="w-[340px] font-sans text-gray-800 overflow-hidden rounded-lg border-t-4 border-[#00BCD4]">
        {headerContent}

        <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
          {point.rating && (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < starRating ? 'text-[#FFC107] fill-[#FFC107]' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">{point.rating}</span>
              <span className="text-xs text-gray-400">({point.reviews} reseñas)</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00BCD4] shrink-0" />
              <span className="text-gray-600">{point.tour.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#00BCD4] shrink-0" />
              <span className="text-gray-600">Hasta {point.tour.capacity}</span>
            </div>
          </div>

          <div className="bg-cyan-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#00BCD4] shrink-0" />
              <span className="font-bold text-lg text-[#00838F]">
                {formatPrice(point.tour.pricePerPerson)}
              </span>
              <span className="text-xs text-gray-500">/ persona</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#00BCD4] rounded-full" />
              Actividades
            </h4>
            <div className="space-y-1.5">
              {point.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-2.5 text-sm">
                  <span className="text-[#00BCD4] mt-0.5 shrink-0">
                    {activityIcons[activity.icon] || <TreePine className="w-4 h-4" />}
                  </span>
                  <div>
                    <span className="font-medium text-gray-700">{activity.name}</span>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#00BCD4] rounded-full" />
              Servicios incluidos
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {point.services.lunch && (
                <span className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                  <Utensils className="w-3 h-3" /> Almuerzo
                </span>
              )}
              {point.services.transportation && (
                <span className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                  <Bus className="w-3 h-3" /> Transporte
                </span>
              )}
              {point.services.accommodation && (
                <span className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                  <Hotel className="w-3 h-3" /> Hospedaje
                </span>
              )}
              {point.services.guide && (
                <span className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                  <User className="w-3 h-3" /> Guía
                </span>
              )}
              {point.services.others.map((service, i) => (
                <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#00BCD4] rounded-full" />
              Disponibilidad
            </h4>
            <div className="flex flex-wrap gap-1">
              {point.tour.availability.map((day) => (
                <span key={day} className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-full font-medium">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setViewMode('reserve')}
            className="w-full flex items-center justify-center gap-2 bg-[#00BCD4] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0097A7] transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Solicitar recorrido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[380px] font-sans text-gray-800 overflow-hidden rounded-lg border-t-4 border-[#00BCD4]">
      {headerContent}

      <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
        {formSent ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <Check className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-green-800">Solicitud enviada</p>
            <p className="text-sm text-green-600 mt-1">
              Tu solicitud de recorrido ha sido enviada. El guía te contactará pronto al teléfono o correo proporcionado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReserve} className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Fecha deseada</label>
                <input
                  type="date"
                  required
                  value={reserveForm.date}
                  onChange={(e) => setReserveForm({ ...reserveForm, date: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]/20 outline-none transition-colors"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Número de personas</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReserveForm({ ...reserveForm, people: Math.max(1, reserveForm.people - 1) })}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-8 text-center">{reserveForm.people}</span>
                  <button
                    type="button"
                    onClick={() => setReserveForm({ ...reserveForm, people: Math.min(point.tour.capacity, reserveForm.people + 1) })}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Horario preferido</label>
                <div className="flex gap-2">
                  {['mañana', 'tarde'].map((schedule) => (
                    <button
                      key={schedule}
                      type="button"
                      onClick={() => setReserveForm({ ...reserveForm, schedule })}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        reserveForm.schedule === schedule
                          ? 'bg-[#00BCD4] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {schedule === 'mañana' ? 'Mañana' : 'Tarde'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-gray-600 mb-1">Servicios adicionales</p>
              {point.services.transportation && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reserveForm.transport}
                    onChange={(e) => setReserveForm({ ...reserveForm, transport: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-[#00BCD4] focus:ring-[#00BCD4]"
                  />
                  <span className="text-sm text-gray-700">Transporte (ida y vuelta)</span>
                </label>
              )}
              {point.services.accommodation && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reserveForm.accommodation}
                    onChange={(e) => setReserveForm({ ...reserveForm, accommodation: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-[#00BCD4] focus:ring-[#00BCD4]"
                  />
                  <span className="text-sm text-gray-700">Hospedaje rural</span>
                </label>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <p className="text-xs font-medium text-gray-600">Tus datos de contacto</p>
              <input
                type="text"
                required
                value={reserveForm.name}
                onChange={(e) => setReserveForm({ ...reserveForm, name: e.target.value })}
                placeholder="Tu nombre completo"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]/20 outline-none"
              />
              <input
                type="tel"
                required
                value={reserveForm.phone}
                onChange={(e) => setReserveForm({ ...reserveForm, phone: e.target.value })}
                placeholder="Teléfono de contacto"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]/20 outline-none"
              />
              <input
                type="email"
                required
                value={reserveForm.email}
                onChange={(e) => setReserveForm({ ...reserveForm, email: e.target.value })}
                placeholder="Correo electrónico"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]/20 outline-none"
              />
              <textarea
                rows={2}
                value={reserveForm.notes}
                onChange={(e) => setReserveForm({ ...reserveForm, notes: e.target.value })}
                placeholder="Notas o preguntas adicionales (opcional)"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]/20 outline-none resize-none"
              />
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#00BCD4] rounded-full" />
                Contacto del guía
              </h4>
              <div className="bg-cyan-50 rounded-lg p-3 space-y-1.5">
                <p className="text-sm font-medium text-gray-800">{point.guide.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3 h-3" />
                  {point.guide.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail className="w-3 h-3" />
                  {point.guide.email}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#00BCD4] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0097A7] transition-colors"
            >
              <Send className="w-4 h-4" />
              Enviar solicitud de reserva
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
