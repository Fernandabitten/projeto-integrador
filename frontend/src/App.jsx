import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { registerUser, login } from './services/authService';
import toast from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MyTrails from './pages/MyTrails';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './components/AuthForm';
import TrailFormModal from './components/TrailFormModal';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const mainRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Rotas sem sidebar
  const hideSidebarRoutes = ['/login', '/register'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  // Carregar estado de autenticação
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (auth === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  function capitalizeWords(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }

  const handleAuth = async (data, mode) => {
    try {
      if (mode === 'register') {
        await registerUser(data);
        toast.success(`Usuário ${data.name} cadastrado com sucesso!`);
        navigate('/login');
      } else {
        const res = await login(data);

        const { user, token } = res.data;

        // salva no estado
        setUser(user);
        setIsAuthenticated(true);

        // salva no localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');

        toast.success(`Bem-vindo(a), ${capitalizeWords(user.name)}!`);
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.message || 'Erro inesperado ao autenticar.');
      console.error('Erro de autenticação:', error);
    }
  };

  // Tela de carregamento
  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center h-screen text-gray-600"
        role="status"
        aria-live="polite"
      >
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-text">
      {/* Sidebar — barra lateral */}
      {!shouldHideSidebar && (
        <aside aria-label="Barra lateral de navegação" className="h-full">
          <Sidebar handleLogout={handleLogout} />
        </aside>
      )}

      {/* Conteúdo principal */}
      <main
        ref={mainRef}
        id="main-content"
        role="main"
        className={`flex-1 overflow-y-auto bg-gray-50 ${
          shouldHideSidebar ? 'w-full h-full' : 'p-4'
        }`}
      >
        <Routes>
          {/* Rotas públicas */}
          <Route
            path="/login"
            element={<AuthForm mode="login" navigate={navigate} onAuth={handleAuth} />}
          />
          <Route
            path="/register"
            element={<AuthForm mode="register" navigate={navigate} onAuth={handleAuth} />}
          />

          {/* Rotas protegidas */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Rotas aninhadas */}
          <Route
            path="/minhas-trilhas"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyTrails handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          >
            <Route path="new" element={<TrailFormModal />} />
          </Route>

          <Route
            path="/sobre"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <About handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {/* Botão Scroll To Top */}
      <ScrollToTop scrollRef={mainRef} />
    </div>
  );
}

export default App;
