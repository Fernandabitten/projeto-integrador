import React, { useState, useEffect } from 'react';
import { fetchTrails } from '../services/trailsService';
import TrailCard from '../components/TrailCard';
import FilterBar from '../components/FilterBar';
import TrailDetailsModal from '../components/TrailDetailsModal';
import AvatarMenu from '../components/AvatarMenu';

const Home = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrail, setSelectedTrail] = useState(null);

  const [filters, setFilters] = useState({
    state: 'todas',
    city: 'todas',
    difficulty: 'todas',
  });

  // ────────────────────────────────────────────────────────────────
  // Carregar dados
  // ────────────────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchTrails();
        setData(result.data);
      } catch (err) {
        console.error('Erro ao buscar dados na Home:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ────────────────────────────────────────────────────────────────
  // Filtrar trilhas sempre que filtros mudarem
  // ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const lower = str => str.trim().toLowerCase();

    let result = data;

    if (filters.state !== 'todas') {
      result = result.filter(t => lower(t.state) === lower(filters.state));
    }

    if (filters.city !== 'todas') {
      result = result.filter(t => lower(t.city) === lower(filters.city));
    }

    if (filters.difficulty !== 'todas') {
      result = result.filter(t => lower(t.difficulty) === lower(filters.difficulty));
    }

    setFiltered(result);
  }, [filters, data]);

  // ────────────────────────────────────────────────────────────────
  // Estados: Loading / Error
  // ────────────────────────────────────────────────────────────────
  if (loading) {
    return <main className="p-8 text-center">Carregando dados...</main>;
  }

  if (error) {
    return (
      <main className="p-8">
        <div className="text-red-600 border border-red-300 bg-red-50 rounded-lg p-4">
          Erro ao carregar: <strong>{error}</strong>
          <p className="mt-2 text-sm text-red-500">
            Verifique se sua API está rodando e respondendo corretamente.
          </p>
        </div>
      </main>
    );
  }

  // ────────────────────────────────────────────────────────────────
  // Render principal
  // ────────────────────────────────────────────────────────────────
  return (
    <main className="flex-1 p-2 md:pt-0 ml-15 md:ml-0">
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Trilhas</h1>
        <AvatarMenu handleLogout={handleLogout} />
      </header>

      <hr className="border-t border-text/50 mb-6" />

      {/* Seção de Filtros */}
      <section className="mb-6">
        <FilterBar trails={data} onFilterChange={setFilters} filters={filters} />
      </section>

      {/* Lista de Trilhas */}
      <section
        className="
          grid 
          gap-8 
          justify-center
          sm:grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3
        "
      >
        {filtered.length > 0 ? (
          filtered.map(trail => (
            <TrailCard
              key={trail.id}
              trail={trail}
              onClickDetails={() => setSelectedTrail(trail)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Nenhuma trilha encontrada com os filtros selecionados.
          </p>
        )}
      </section>

      {/* Modal */}
      <TrailDetailsModal trail={selectedTrail} onClose={() => setSelectedTrail(null)} />
    </main>
  );
};

export default Home;
