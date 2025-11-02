# Requisitos Funcionais (RF)

- **RF01: Cadastro de Usuário** O sistema solicitará que usuários criem uma conta informando nome, e-mail e senha.

- **RF02: Autenticação** O sistema permitirá que o usuário faça login com e-mail e senha.

- **RF03: Cadastro de Trilha** O sistema permitirá que o usuário cadastre trilhas informando nome, localização, distância, nível de dificuldade, descrição e fotos.

- **RF04: Listagem e Filtro de Trilhas** O sistema exibirá uma lista de trilhas cadastradas, permitindo aplicar filtros por estado, cidade e/ou nível de dificuldade.

- **RF05: Mapa Interativo** O sistema apresentará as trilhas em um mapa interativo com visualização de rotas.

- **RF06: Perfil de Usuário** O sistema permitirá que o usuário veja e edite seu perfil, e visualize as trilhas que cadastrou.

- **RF07: Edição e Exclusão de Trilhas** O sistema permitirá que o usuário edite ou exclua trilhas que ele mesmo cadastrou.

- **RF08: Visualização de Detalhes da Trilha** O sistema exibirá os detalhes completos de uma trilha (nome, descrição, fotos, dificuldade, distância e localização) e (futuro) mapa.


# Requisitos Não Funcionais (RNF)

- **RNF01: Desempenho** O tempo de resposta para carregar a lista de trilhas deve ser inferior a 3 segundos em condições normais.

- **RNF02: Usabilidade** A interface deve ser intuitiva e de fácil navegação, com feedback claro para ações do usuário.

- **RNF03: Segurança** Os dados de usuários devem ser armazenados de forma segura com criptografia de senha e uso de HTTPS.

- **RNF04: Responsividade** O sistema deve ser responsivo, adaptando-se a diferentes dispositivos e compatível com navegadores modernos (Chrome, Firefox, Safari).

- **RNF05: Escalabilidade** A arquitetura deve permitir o crescimento da base de usuários e o acréscimo de novas funcionalidades sem perda significativa de performance.

- **RNF06: Disponibilidade** O sistema deve estar disponível 24h por dia, 7 dias por semana.

- **RNF07: Acessibilidade** O sistema deve seguir diretrizes WCAG para garantir acesso a pessoas com deficiência.

- **RNF08: Tratamento de Erros e Mensagens Claras** O sistema deve exibir mensagens claras e amigáveis em casos de erro (ex: login incorreto, upload falhou etc.).

- **RNF09: Upload de Imagens** O sistema deve aceitar o upload de múltiplos arquivos e limitar o tamanho máximo de cada imagem a 5MB.

- **RNF10: Boas Práticas de Código** O projeto deve seguir boas práticas de desenvolvimento e versionamento Git (`main`, `feature/`, `fix/`).


## Versão do documento
Atualizado em: 19/10/2025
Responsável: Grazielle Carvalho