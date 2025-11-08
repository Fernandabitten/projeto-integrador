// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <section className="flex-1 bg-gray-50 min-h-screen p-8 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-4">
          Sobre o Trilha Conectada
        </h1>

        <p className="text-gray-700 mb-6 text-justify">
          O <strong>Trilha Conectada</strong> nasceu com o propósito de conectar amantes da
          natureza e aventureiros de todas as dificuldades. Acreditamos que o
          acesso fácil a informações detalhadas sobre rotas, segurança e paisagens
          enriquece a experiência de cada trilha.
        </p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Nossa Missão
        </h2>
        <p className="text-gray-700 mb-6 text-justify">
          Oferecer a plataforma mais completa e interativa para que os usuários
          possam descobrir, cadastrar e compartilhar trilhas em todo o Brasil.
          Promovemos a exploração segura e consciente do meio ambiente,
          incentivando o uso de tecnologias de mapeamento como GPX e KML.
        </p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Funcionalidades Chave
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-justify">
          <li>
            <strong>Cadastro de Trilhas:</strong> Usuários podem adicionar novas
            trilhas com detalhes como localização, descrição, dificuldade e fazer
            upload de fotos.
          </li>
          <li>
            <strong>Upload de Rotas:</strong> Suporte para arquivos
            <code> .gpx </code> e <code> .kml </code> para visualização interativa
            do mapa.
          </li>
          <li>
            <strong>Listagem e Filtros:</strong> Pesquisa e filtragem eficiente
            por localização e nível de dificuldade (Fácil, Moderado, Difícil).
          </li>
          <li>
            <strong>Autenticação Segura:</strong> Login e Cadastro para gerenciar
            suas próprias contribuições.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
