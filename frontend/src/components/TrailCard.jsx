import React from 'react';
import { MapPin, Mountain, Ruler, Pencil, Trash } from 'lucide-react';

export default function TrailCard({
  trail,
  onClickDetails,
  onEdit,
  onDelete,
  showActions = false,
}) {
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
      className="relative bg-bg-2 rounded-2xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]"
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

        <div className="mt-4 flex items-center justify-between gap-2">
          {/* Botão Detalhes */}
          <button
            onClick={e => {
              e.stopPropagation();
              onClickDetails();
            }}
            className="mt-4 w-full py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition relative z-20"
            aria-label={`Ver detalhes da trilha ${trail.name}`}
          >
            Ver Detalhes
          </button>
          {/* Botões Editar e Excluir */}
          {showActions && (
            <div className="flex gap-3">
              <button
                onClick={e => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="h-10 w-10 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition"
              >
                <Pencil className="h-5 w-5" />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation(); // impede o clique de subir para o card
                  onDelete();
                }}
                className="h-10 w-10 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition relative z-30"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
