import React, { useState } from 'react';
import { LogOut, Settings, User, SunMoon } from 'lucide-react';

export default function AvatarMenu({ handleLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      {/* ========= AVATAR (Botão) ========= */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <User className="w-full h-full mr-2" />
      </button>

      {/* ========= DROPDOWN ========= */}
      {open && (
        <menu
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 flex flex-col"
          role="menu"
        >
          {/* Item: Editar Perfil */}
          {/* <button
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => alert('Editar Perfil')}
            role="menuitem"
          >
            <User className="w-4 h-4 mr-2" />
            Editar Perfil
          </button> */}

          {/* Item: Tema */}
          {/* <button
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => alert('Alternar tema')}
            role="menuitem"
          >
            <SunMoon className="w-4 h-4 mr-2" />
            Tema
          </button> */}

          {/* Item: Logout */}
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
            role="menuitem"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </button>
        </menu>
      )}
    </nav>
  );
}
