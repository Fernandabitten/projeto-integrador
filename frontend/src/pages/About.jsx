import AvatarMenu from '../components/AvatarMenu';

const About = ({ handleLogout }) => {
  return (
    <main className="flex-1 p-2 ml-15 md:ml-0 md:pt-0">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Sobre o Trilha Conectada</h1>
        <AvatarMenu handleLogout={handleLogout} />
      </header>

      <hr className="border-t border-text/50" />

      {/* Conteúdo Principal */}
      <article className="bg-white mt-4 rounded-lg shadow-sm p-8 w-full text-base md:text-2xl">
        {/* Descrição */}
        <section aria-label="Descrição do Trilha Conectada">
          <p className="text-gray-700 mb-6 text-justify">
            O <strong>Trilha Conectada</strong> nasceu com o propósito de conectar amantes da
            natureza e aventureiros de todas as dificuldades. Acreditamos que o acesso fácil a
            informações detalhadas sobre rotas, segurança e paisagens enriquece a experiência de
            cada trilha.
          </p>
          <hr className="border-t border-text/50" />
        </section>

        {/* Missão */}
        <section aria-label="Missão do Trilha Conectada" className="mt-8">
          <h2 className="font-semibold text-gray-800 mb-3">Nossa Missão</h2>
          <p className="text-gray-700 mb-6 text-justify">
            Oferecer uma plataforma interativa para que os usuários possam descobrir, cadastrar e
            compartilhar trilhas em todo o Brasil. Promovendo a exploração segura e consciente do
            meio ambiente, incentivando o uso de tecnologias de mapeamento como GPX e KML.
          </p>
          <hr className="border-t border-text/50" />
        </section>

        {/* Funcionalidades */}
        <section aria-label="Funcionalidades do Trilha Conectada" className="mt-8">
          <h2 className="font-semibold text-gray-800 mb-3">Funcionalidades Chave</h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2 text-justify">
            <li>
              <strong>Cadastro de Trilhas:</strong> Usuários podem adicionar novas trilhas com
              detalhes como localização, descrição, dificuldade e fazer upload de fotos.
            </li>

            <li>
              <strong>Upload de Rotas:</strong> Suporte para arquivos
              <code> .gpx </code> e <code> .kml </code> para visualização interativa do mapa.
            </li>

            <li>
              <strong>Listagem e Filtros:</strong> Pesquisa e filtragem eficiente por localização e
              nível de dificuldade (Fácil, Moderado, Difícil).
            </li>

            <li>
              <strong>Autenticação Segura:</strong> Login e Cadastro para gerenciar suas próprias
              contribuições.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
};

export default About;
