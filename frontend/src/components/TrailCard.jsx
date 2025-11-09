import React from 'react';
import { MapPin, Mountain, Ruler } from 'lucide-react';

export default function TrailCard({ trail, onClickDetails }) {
  if (
    !trail ||
    !trail.name ||
    !trail.photos ||
    !Array.isArray(trail.photos) ||
    !trail.photos[0]?.url
  ) {
    return (
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-center">
        Não foi possível carregar os dados desta trilha.
      </div>
    );
  }

  return (
    <div className="bg-bg-2 rounded-2xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]">
      <img src={trail.photos[0].url} alt={trail.name} className="h-[220px] w-full object-cover" />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{trail.name}</h3>

        <div className="flex items-center text-lg">
          <MapPin className="h-4 w-4 text-primary mr-1" />
          {trail.city || 'Local desconhecido'}, {trail.state || '—'}
        </div>

        <div className="flex items-center justify-between mt-2 text-lg">
          <div className="flex items-center font-semibold">
            <Mountain className="h-4 w-4 mr-1 text-amber-600" />
            {trail.difficulty || 'N/D'}
            <Ruler className="h-4 w-4 mr-1 ml-4 text-blue-600" />
            {trail.distance ?? '—'} km
          </div>
        </div>

        {/* ✅ Botão que dispara o modal */}
        <button
          onClick={onClickDetails}
          className="mt-4 w-full py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
