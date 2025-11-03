import React, { useState, useEffect } from 'react';
import { getJSON } from '../services/api';
import TrailCard from '../components/TrailCard';

// --- Dados simulados ---
const statesAndCities = {
  Ceará: ['Fortaleza', 'Sobral', 'Juazeiro do Norte'],
  Bahia: ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
  Pernambuco: ['Recife', 'Olinda', 'Caruaru'],
};

const dificulties = ['Fácil', 'Média', 'Difícil'];

// --- Componente de Filters ---
const Filters = () => {
   const [state] = useState('Ceará');
   const [city, setCity] = useState('Todas as cidades');
   const [dificulty, setDificulty] = useState('Todas');
   const [AvailableCities, setAvailableCities] = useState(statesAndCities[state]);

  // Atualiza cidades quando o estado muda
  useEffect(() => {
    setAvailableCities(statesAndCities[state]);
    setCity('Todas as cidades');
  }, [state]);

  return (
    <div className="flex flex-wrap items-center gap-6 bg-[#fff6f6] p-4 rounded-lg shadow-md mb-6">
      {/* Estado */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Estado:</label>
        <select
          value={state}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-rose-300"
        >
          {Object.keys(statesAndCities).map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
      </div>

      {/* Cidade */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Cidade:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-rose-300 min-w-[150px]"
        >
          <option>Todas as cidades</option>
          {AvailableCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Dificuldade */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Dificuldade:</label>
        <select
          value={dificulty}
          onChange={(e) => setDificulty(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-rose-300 min-w-[100px]"
        >
          <option>Todas</option>
          {dificulties.map((dif) => (
            <option key={dif} value={dif}>
              {dif}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// --- Componente Principal (Home) ---
const Home = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ROUTE = '/trilhas';

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await getJSON(API_ROUTE);
        setData(result);
        setFilteredData(result);
      } catch (err) {
        console.error('Erro ao buscar dados na Home:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // --- Aplicar Filters dinamicamente ---
  const handleFilterChange = ({ estado, cidade, dificuldade }) => {
    if (!data) return;

    let filtradas = [...data];

    if (estado && estado !== '') {
      filtradas = filtradas.filter((t) => t.estado === estado);
    }

    if (cidade && cidade !== 'Todas as cidades') {
      filtradas = filtradas.filter((t) => t.cidade === cidade);
    }

    if (dificuldade && dificuldade !== 'Todas') {
      filtradas = filtradas.filter((t) => t.dificuldade === dificuldade);
    }

    setFilteredData(filtradas);
  };

  // --- Renderização ---
  if (loading) {
    return <div className="p-8 text-center">Carregando dados...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 border border-red-300 bg-red-50 rounded-lg">
        Erro ao carregar: <strong>{error}</strong>
        <p className="mt-2 text-sm text-red-500">
          Verifique se sua API ({API_ROUTE}) está rodando e respondendo.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-15 md:ml-0 md:pt-0 pt-0 p-2">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">Trilhas</h1>
        <hr className="border-t border-text/50 mb-6" />
      </div>

      {/* Filters */}
      <Filters onChange={handleFilterChange} />

      {/* Lista de trilhas */}
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
        {filteredData?.length > 0 ? (
          filteredData.map((t) => <TrailCard key={t.id} trail={t} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
