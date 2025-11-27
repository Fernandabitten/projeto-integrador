import { useLocation, useNavigate } from 'react-router-dom';
import TrailMap from '../components/TrailMap';
import AvatarMenu from '../components/AvatarMenu';
import { MapPin, Mountain, Ruler } from 'lucide-react';

export default function TrailMapPage({ handleLogout }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trail } = state || {};

  if (!trail) {
    return (
      <main className="p-4">
        <p className="text-red-600 font-semibold" role="alert">
          Erro: dados da trilha não foram enviados.
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-2 ml-15 md:ml-0 md:pt-0" role="main">
      {/* Cabeçalho da página */}
      <header className="flex justify-between items-center mb-2" aria-label="Cabeçalho da página">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Mapa da Trilha</h1>

        <nav aria-label="Menu do usuário">
          <AvatarMenu handleLogout={handleLogout} />
        </nav>
      </header>

      <hr className="border-t border-text/50 mb-6" />

      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        {/* Seção de informações da trilha */}
        <section className="mb-4 sm:mb-6" aria-labelledby="trail-info-title">
          <h2 id="trail-info-title" className="text-2xl sm:text-3xl font-bold text-gray-800">
            {trail.name}
          </h2>

          <ul
            className="
              flex flex-col sm:flex-row 
              sm:items-center sm:gap-6 
              text-gray-600 mt-2 
              text-sm sm:text-base
            "
          >
            {/* Localização */}
            <li className="flex items-center">
              <MapPin className="h-4 w-4 text-primary mr-1" aria-hidden="true" />
              <span>
                {trail.city || 'Local desconhecido'}, {trail.state || '—'}
              </span>
            </li>

            {/* Dificuldade */}
            <li className="flex items-center">
              <Mountain className="h-4 w-4 text-amber-600 mr-1" aria-hidden="true" />
              <span>
                Dificuldade: <strong>{trail.difficulty}</strong>
              </span>
            </li>

            {/* Distância */}
            <li className="flex items-center">
              <Ruler className="h-4 w-4 text-blue-600 mr-1" aria-hidden="true" />
              <span>
                Distância: <strong>{trail.distance} km</strong>
              </span>
            </li>
          </ul>
        </section>

        {/* Card do mapa */}
        <section
          className="bg-white shadow-lg sm:shadow-xl rounded-xl p-3 sm:p-4"
          aria-labelledby="map-title"
        >
          <h2
            id="map-title"
            className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3"
          >
            Visualização da Rota
          </h2>

          <div
            className="
              relative w-full overflow-hidden rounded-xl 
              h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] bg-gray-200
            "
            role="region"
            aria-label="Mapa com a rota da trilha"
          >
            <TrailMap gpxUrl={trail.gpxUrl} />
          </div>
        </section>

        {/* Botão de voltar */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="
              w-full sm:w-auto px-6 py-3 bg-lime-400 hover:bg-lime-500
              text-green-900 font-semibold rounded-xl transition shadow 
              text-center focus:outline-none focus:ring-2 
              focus:ring-lime-600 focus:ring-offset-2
            "
            aria-label="Voltar para a lista de trilhas"
          >
            Voltar para trilhas
          </button>
        </div>
      </div>
    </main>
  );
}
