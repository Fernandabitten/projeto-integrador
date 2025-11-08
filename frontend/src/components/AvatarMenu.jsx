import React, { useState } from 'react';
import { LogOut, Settings, User, SunMoon } from 'lucide-react';

export default function AvatarMenu({ handleLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
      >
        <User className="w-full h-full mr-2" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
          <button
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => alert('Editar Perfil')}
          >
            <User className="w-4 h-4 mr-2" /> Editar Perfil
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => alert('Alternar tema')}
          >
            <SunMoon className="w-4 h-4 mr-2" /> Tema
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </button>
        </div>
      )}
    </div>
  );
}
