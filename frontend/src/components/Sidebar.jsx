import { Link, useLocation } from 'react-router-dom';
import { Home, Star, LogOut, BadgeInfo } from 'lucide-react';
import logo from '../assets/logo-marca.svg';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { key: '/home', label: 'Trilhas', icon: <Home size={22} /> },
    { key: '/minhas-trilhas', label: 'Minhas Trilhas', icon: <Star size={22} /> },
    { key: '/sobre', label: 'Sobre', icon: <BadgeInfo size={22} /> },
  ];

  return (
    <aside
      className="
        bg-bg h-screen p-0 flex flex-col transition-all duration-300 ease-in-out
        fixed md:static z-40 w-20 md:w-64
      "
      aria-label="Menu lateral"
    >
      {/* Header da sidebar */}
      <header className="flex items-center justify-center py-4">
        <img src={logo} alt="Logo da plataforma Trilha Conectada" className="w-32 h-auto" />
      </header>

      {/* Navegação */}
      <nav className="flex-1 space-y-2 text-2xl" aria-label="Navegação principal">
        {navItems.map(item => {
          const isActive = location.pathname === item.key;

          return (
            <Link
              key={item.key}
              to={item.key}
              className={`flex items-center w-full p-2 font-medium transition duration-150
                ${
                  isActive
                    ? 'bg-[#6B726E] text-primary border-l-4 border-primary'
                    : 'text-text-secundary hover:bg-primary'
                }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon}
              <span className="hidden md:inline ml-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
