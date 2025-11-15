import React, { useState, useMemo } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import TrailFormModal from './TrailFormModal';

const FilterBar = ({ trails, onFilterChange, filters, onTrailAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ========= SUBMIT DE TRILHA (create/edit) =========
  const handleTrailSubmit = async (newTrailData, mode) => {
    if (mode === 'create') toast.success('Trilha cadastrada com sucesso!');
    if (mode === 'edit') toast.success('Trilha atualizada com sucesso!');

    setShowForm(false);

    if (typeof onTrailAdded === 'function') await onTrailAdded();
    navigate('/minhas-trilhas');
  };

  // ========= LISTA DE ESTADOS ÚNICOS =========
  const states = useMemo(() => {
    return [...new Set(trails.map(t => t.state).filter(Boolean))];
  }, [trails]);

  // ========= LISTA DE CIDADES DINÂMICA =========
  const cities = useMemo(() => {
    const selectedState = filters.state !== 'todas' ? filters.state : null;
    let filtered = selectedState ? trails.filter(t => t.state === selectedState) : trails;
    return [...new Set(filtered.map(t => t.city).filter(Boolean))];
  }, [trails, filters.state]);

  const difficulties = ['Fácil', 'Moderado', 'Difícil'];

  // ========= ATUALIZAÇÃO DOS FILTROS =========
  const handleChange = e => {
    const { name, value } = e.target;

    onFilterChange(prev => {
      if (name === 'state') return { ...prev, state: value, city: 'todas' };
      return { ...prev, [name]: value };
    });
  };

  const isMyTrailsPage = location.pathname === '/minhas-trilhas';

  return (
    <fieldset className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-2xl shadow-sm border border-gray-200 mb-6">
      <legend className="sr-only">Filtros de trilhas</legend>

      {/* ========= FILTRO: ESTADO ========= */}
      <section className="flex flex-col">
        <label htmlFor="state" className="text-sm font-semibold mb-1">
          Estado:
        </label>
        <select
          id="state"
          name="state"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="todas">Todos os estados</option>
          {states.map(uf => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
      </section>

      {/* ========= FILTRO: CIDADE ========= */}
      <section className="flex flex-col">
        <label htmlFor="city" className="text-sm font-semibold mb-1">
          Cidade:
        </label>
        <select
          id="city"
          name="city"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="todas">Todas as cidades</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </section>

      {/* ========= FILTRO: DIFICULDADE + BOTÃO ========= */}
      <section className="flex flex-col md:flex-row md:items-end md:gap-3">
        <div className="flex flex-col flex-1">
          <label htmlFor="difficulty" className="text-sm font-semibold mb-1">
            Dificuldade:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="todas">Todas</option>
            {difficulties.map(dif => (
              <option key={dif} value={dif}>
                {dif}
              </option>
            ))}
          </select>
        </div>

        {/* Botão só aparece na tela /minhas-trilhas */}
        {isMyTrailsPage && (
          <NavLink to="new">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-lg transition mt-3 md:mt-0"
            >
              Cadastrar trilha
            </button>
          </NavLink>
        )}
      </section>

      {/* ========= MODAL DE TRILHA ========= */}
      {showForm && (
        <TrailFormModal
          mode="create"
          onClose={() => setShowForm(false)}
          onSubmit={handleTrailSubmit}
          trailData={null}
        />
      )}
    </fieldset>
  );
};

export default FilterBar;
