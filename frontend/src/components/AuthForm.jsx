import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import logo from '../assets/logo-marca.svg';

const AuthForm = ({ mode, navigate, onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isRegister = mode === 'register';

  // Limpa campos ao trocar o modo
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [mode]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    await onAuth({ name, email, password }, mode);

    if (isRegister) navigate('/login');

    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* ====== LADO DO FORMULÁRIO ====== */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:bg-bg shadow-xl">
        <div className="w-full max-w-sm">
          {/* === Logo === */}
          <header className="flex items-center justify-center w-full h-1/3">
            <img src={logo} alt="Logo Trilha Conectada" className="w-32 h-auto mx-auto" />
          </header>

          {/* === Conteúdo do Formulário === */}
          <main className="flex flex-col justify-start w-full h-2/3">
            <h2 className="text-2xl font-bold md:text-white mb-6">
              {isRegister ? 'Crie sua conta' : 'Faça seu login'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full p-3 bg-bg-input-1 rounded-lg text-white placeholder-text-secundary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}

              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-bg-input-1 rounded-lg text-white placeholder-text-secundary focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full p-3 bg-bg-input-1 rounded-lg text-white placeholder-text-secundary focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 disabled:bg-green-400 flex justify-center items-center"
              >
                {isLoading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
                {isRegister ? 'Cadastrar' : 'Entrar'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              {isRegister ? 'Já tem conta?' : 'Não tem conta?'}
              <button
                type="button"
                onClick={() => navigate(isRegister ? 'login' : 'register')}
                className="ml-1 text-green-600 hover:text-green-700 font-medium"
              >
                {isRegister ? 'Faça login' : 'Cadastre-se'}
              </button>
            </p>
          </main>
        </div>
      </section>

      {/* ====== LADO DA LOGO (Desktop) ====== */}
      <aside className="hidden md:flex md:w-1/2 items-center justify-center bg-[#F6FCF2]/70">
        <img src={logo} alt="Logo Trilha Conectada" className="w-[80%] h-auto object-contain" />
      </aside>
    </div>
  );
};

export default AuthForm;
