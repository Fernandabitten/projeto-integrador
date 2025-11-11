import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MyTrails from './pages/MyTrails';
import About from './pages/About';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import { postJSON } from './services/api';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const mainRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // rotas em que a sidebar não deve aparecer
  const hideSidebarRoutes = ['/login', '/register'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (auth === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    // Finaliza o carregamento
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  function capitalizeWords(str) {
    return str
      .toLowerCase() // deixa tudo minúsculo
      .replace(/\b\w/g, char => char.toUpperCase()); // coloca em maiúsculo a primeira letra de cada palavra
  }

  const handleAuth = async (data, mode) => {
    try {
      if (mode === 'register') {
        await postJSON('/auth/register', data);
        toast.success(`Usuário ${data.name} cadastrado com sucesso!`);
        navigate('/login');
      } else {
        const res = await postJSON('/auth/login', data);
        // TODO: refatorar com token do usuario quando implementar no Back
        setUser(res.user);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(res.user));
        toast.success(`Bem-vindo(a), ${capitalizeWords(res.user.name)}!`);
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.message || 'Erro inesperado ao autenticar.');
      console.error('Erro de autenticação:', error);
    }
  };

  // Enquanto ainda está carregando o estado do login, não renderiza as rotas
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">Carregando...</div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-text">
      {/* mostra a sidebar apenas se não estiver em / */}
      {!shouldHideSidebar && <Sidebar handleLogout={handleLogout} />}

      {/* main ocupa a tela toda em /login */}
      <main
        ref={mainRef}
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
          <Route
            path="/minhas-trilhas"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyTrails handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sobre"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <About />
              </ProtectedRoute>
            }
          />
          {/* Página não encontrada → redireciona para login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      <ScrollToTop scrollRef={mainRef} />
    </div>
  );
}

export default App;
