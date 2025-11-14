import React from 'react';
import { MapPin, Mountain, Ruler } from 'lucide-react';

export default function TrailCard({ trail, onClickDetails }) {
  // Validação de dados
  if (
    !trail ||
    !trail.name ||
    !trail.photos ||
    !Array.isArray(trail.photos) ||
    !trail.photos[0]?.url
  ) {
    return (
      <section
        className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-center"
        role="alert"
      >
        Não foi possível carregar os dados desta trilha.
      </section>
    );
  }

  return (
    <article
      className="bg-bg-2 rounded-2xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]"
      aria-label={`Cartão da trilha ${trail.name}`}
    >
      <img
        src={trail.photos[0].url}
        alt={`Foto da trilha ${trail.name}`}
        className="h-[220px] w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{trail.name}</h3>

        {/* Localização */}
        <div className="flex items-center text-lg">
          <MapPin className="h-4 w-4 text-primary mr-1" aria-hidden="true" />
          <span>
            {trail.city || 'Local desconhecido'}, {trail.state || '—'}
          </span>
        </div>

        {/* Dificuldade + Distância */}
        <div className="flex items-center justify-between mt-2 text-lg">
          <div className="flex items-center font-semibold">
            <Mountain className="h-4 w-4 mr-1 text-amber-600" aria-hidden="true" />
            <span>{trail.difficulty || 'N/D'}</span>

            <Ruler className="h-4 w-4 mr-1 ml-4 text-blue-600" aria-hidden="true" />
            <span>{trail.distance ?? '—'} km</span>
          </div>
        </div>

        {/* Botão Detalhes */}
        <button
          onClick={onClickDetails}
          className="mt-4 w-full py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition"
          aria-label={`Ver detalhes da trilha ${trail.name}`}
        >
          Ver Detalhes
        </button>
      </div>
    </article>
  );
}
