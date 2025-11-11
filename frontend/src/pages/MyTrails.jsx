import React, { useState, useEffect } from 'react';
import { fetchTrails } from '../services/trailsService';
import TrailCard from '../components/TrailCard';
import FilterBar from '../components/FilterBar';
import TrailDetailsModal from '../components/TrailDetailsModal';
import AvatarMenu from '../components/AvatarMenu';

const MyTrails = ({ handleLogout }) => {
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

  // Obtem usuário logado
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchTrails();

      // Filtra apenas as trilhas do usuário logado
      const userTrails = result.filter(trail => trail.userId === userId);

      setData(userTrails);
    } catch (err) {
      console.error('Erro ao buscar trilhas:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchData();
    } else {
      setError('Usuário não identificado. Faça login novamente.');
      setLoading(false);
    }
  }, [userId]);

  //Filtro dinâmico por estado, cidade e dificuldade
  useEffect(() => {
    let filteredData = [...data];

    if (filters.state !== 'todas') {
      filteredData = filteredData.filter(
        t => t.state.trim().toLowerCase() === filters.state.trim().toLowerCase()
      );
    }

    if (filters.city !== 'todas') {
      filteredData = filteredData.filter(
        t => t.city.trim().toLowerCase() === filters.city.trim().toLowerCase()
      );
    }

    if (filters.difficulty !== 'todas') {
      filteredData = filteredData.filter(
        t => t.difficulty.trim().toLowerCase() === filters.difficulty.trim().toLowerCase()
      );
    }

    setFiltered(filteredData);
  }, [filters, data]);

  // Renderização
  if (loading) {
    return <div className="p-8 text-center">Carregando trilhas...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 border border-red-300 bg-red-50 rounded-lg">
        Erro: <strong>{error}</strong>
        <p className="mt-2 text-sm text-red-500">
          Verifique se você está logado e se a API está rodando.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-15 md:ml-0 md:pt-0 pt-0 p-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Minhas Trilhas</h1>
        <AvatarMenu handleLogout={handleLogout} />
      </div>

      <hr className="border-t border-text/50 mb-6" />

      <FilterBar
        trails={data}
        onFilterChange={setFilters}
        filters={filters}
        onTrailAdded={fetchData}
      />

      <div
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
          filtered.map(t => (
            <TrailCard key={t.id} trail={t} onClickDetails={() => setSelectedTrail(t)} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Você ainda não cadastrou nenhuma trilha.
          </div>
        )}
      </div>

      <TrailDetailsModal trail={selectedTrail} onClose={() => setSelectedTrail(null)} />
    </div>
  );
};

export default MyTrails;
