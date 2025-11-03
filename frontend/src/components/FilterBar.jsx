import React, { useState, useEffect } from 'react';

const statesAndCities = {
  Ceará: ['Fortaleza', 'Sobral', 'Juazeiro do Norte'],
  Bahia: ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
  Pernambuco: ['Recife', 'Olinda', 'Caruaru'],
};

const dificulties = ['Fácil', 'Média', 'Difícil'];

export default function Filters() {
  const [state, setState] = useState('Ceará');
  const [city, setCity] = useState('Todas as cidades');
  const [dificulty, setDificulty] = useState('Todas');
  const [AvailableCities, setAvailableCities] = useState(statesAndCities[state]);

  useEffect(() => {
    setAvailableCities(statesAndCities[state]);
    setCity('Todas as cidades');
  }, [state]);

  const handleFiltro = () => {
    console.log({
      state,
      city,
      dificulty
    });
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      backgroundColor: '#fff6f6',
      padding: '10px 15px',
      borderRadius: '6px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      alignItems: 'center'
    }}>
      <div>
        <label>Estado:</label><br />
        <select value={state} onChange={e => setState(e.target.value)}>
          {Object.keys(statesAndCities).map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Cidade:</label><br />
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option>Todas as cidades</option>
          {AvailableCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Dificuldade:</label><br />
        <select value={dificulty} onChange={e => setDificulty(e.target.value)}>
          <option>Todas</option>
          {dificulties.map((dif) => (
            <option key={dif} value={dif}>{dif}</option>
          ))}
        </select>
      </div>

      <button onClick={handleFiltro} style={{
        padding: '6px 12px',
        borderRadius: '4px',
        backgroundColor: '#f0b3b3',
        border: 'none',
        cursor: 'pointer'
      }}>
        Filtrar
      </button>
    </div>
  );
}
