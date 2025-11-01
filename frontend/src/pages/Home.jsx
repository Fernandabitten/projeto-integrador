import React, { useState, useEffect } from 'react';
import { getJSON } from '../services/api';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">Trilhas</h1>
        <hr className="border-t border-text/50 mb-6" />
      </div>
      {/* Código teste apagar quando implementar filtros e cards */}
      {data ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Dados Recebidos:</h2>
          <pre className="whitespace-pre-wrap break-words text-sm">
            {/* Exibe o objeto JSON formatado para visualização */}
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <p>Nenhum dado recebido.</p>
      )}
    </div>
  );
};

export default Home;
