import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AvatarMenu from '../components/AvatarMenu';
import TrailFormModal from '../components/TrailFormModal';

const MyTrails = ({ handleLogout }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const handleTrailSubmit = (newTrailData, mode) => {
    console.log('newTrailDataaa', newTrailData);
    if (mode === 'create') {
      // Simulação de Cadastro (Diagrama 8)
      // setAllTrails(prev => [{ ...newTrailData, isUserTrail: true }, ...prev]);
      alert('Trilha cadastrada com sucesso!');
    } else if (mode === 'edit') {
      // Simulação de Edição (Diagrama 9)
      // setAllTrails(prev => prev.map(t => (t.id === newTrailData.id ? { ...newTrailData, isUserTrail: true } : t)));
      alert('Trilha atualizada com sucesso!');
    }
    navigate('/minhas-trilhas');
    // setCurrentPage('myTrails');
  };
  return (
    <div className="flex-1 ml-15 md:ml-0 md:pt-0 pt-0 p-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Minhas Trilhas</h1>
        <AvatarMenu handleLogout={handleLogout} />
      </div>
      <hr className="border-t border-text/50 mb-6" />
      <div className="flex justify-end mb-4">
        <NavLink to="new">
          <button
            onClick={() => setShowForm(true)}
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Cadastrar trilha
          </button>
        </NavLink>
      </div>

      {showForm && (
        <TrailFormModal
          mode={'create'}
          onClose={() => setShowForm(false)}
          onSubmit={handleTrailSubmit}
          trailData={null}
        />
      )}
    </div>
  );
};

export default MyTrails;
