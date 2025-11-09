import React, { useState, useEffect } from 'react';
import { getJSON } from '../services/api';
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

  useEffect(() => {
    const API_ROUTE = '/trilhas';

    // TODO: Adicionar um token se a rota exigir autenticação
    // const authToken = localStorage.getItem('token');

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Chamar a função getJSON
        // TODO: se precisar de autenticação: await getJSON(API_ROUTE, authToken);
        const result = await getJSON(API_ROUTE);

        setData(result);
      } catch (err) {
        // O erro será tratado no `request` do api.js e relançado aqui
        console.error('Erro ao buscar dados na Home:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // O array vazio assegura que a função roda apenas uma vez, na montagem

  // Quando filtros mudam
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

  // --- Renderização do Componente ---

  if (loading) {
    return <div className="p-8 text-center">Carregando dados...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 border border-red-300 bg-red-50 rounded-lg">
        Erro ao carregar: **{error}**
        <p className="mt-2 text-sm text-red-500">
          Verifique se sua API ({API_ROUTE}) está rodando e respondendo.
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 ml-15 md:ml-0 md:pt-0 pt-0 p-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Trilhas</h1>
        <AvatarMenu handleLogout={handleLogout} />
      </div>
      <hr className="border-t border-text/50 mb-6" />
      {/* ✅ Filtros dinâmicos */}
      <FilterBar trails={data} onFilterChange={setFilters} filters={filters} />
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
            <TrailCard
              key={t.id}
              trail={t}
              onClickDetails={() => setSelectedTrail(t)} // ✅ Agora abre o modal
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Nenhuma trilha encontrada com os filtros selecionados.
          </div>
        )}
      </div>

      {/* ✅ Modal conectado */}
      <TrailDetailsModal trail={selectedTrail} onClose={() => setSelectedTrail(null)} />
    </div>
  );
};

export default Home;
