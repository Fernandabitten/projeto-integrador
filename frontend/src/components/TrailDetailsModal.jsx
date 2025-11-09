import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, MapPin, Mountain, Ruler } from 'lucide-react';

const TrailDetailsModal = ({ trail, onClose }) => {
  if (!trail) return null;

  const photos = trail.photos || [];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-end z-50">
      <div className="bg-[#2B3C35] text-white w-full sm:w-[420px] h-full overflow-y-auto relative p-4 shadow-2xl">
        {/* ✅ HEADER COM TÍTULO E BOTÃO X */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-lg font-semibold">Detalhes da trilha</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Imagem principal */}
        {photos.length > 0 && (
          <div className="relative">
            <img
              src={photos[currentImage].url}
              alt={trail.name}
              className="w-full h-56 object-cover rounded-xl"
            />

            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#9AF300] hover:bg-[#8AE000] p-2 rounded-full"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9AF300] hover:bg-[#8AE000] p-2 rounded-full"
                >
                  <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        )}

        {/* Miniaturas */}
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {photos.map((p, i) => (
            <img
              key={i}
              src={p.url}
              alt={`thumb-${i}`}
              onClick={() => setCurrentImage(i)}
              className={`w-20 h-14 object-cover rounded-lg cursor-pointer border-2 ${
                currentImage === i ? 'border-lime-400' : 'border-transparent'
              }`}
            />
          ))}
        </div>

        {/* Informações */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">{trail.name}</h2>

          <div className="flex items-center gap-2 mt-1 text-sm text-gray-200">
            <MapPin size={16} />
            <span>
              {trail.city}, {trail.state}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1 text-sm">
            <div className="flex items-center gap-1">
              <Mountain size={16} className="text-yellow-400" />
              <span>{trail.difficulty}</span>
            </div>

            <div className="flex items-center gap-1">
              <Ruler size={16} className="text-blue-400" />
              <span>{trail.distance}</span>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-1">Descrição</h3>
          <p className="text-gray-100 text-sm leading-relaxed">{trail.description}</p>
        </div>

        {/* Botão ver mapa */}
        <button className="w-full mt-5 bg-lime-400 hover:bg-lime-500 text-green-900 font-semibold py-2 rounded-xl transition">
          Ver mapa da Trilha
        </button>
      </div>
    </div>
  );
};

export default TrailDetailsModal;
