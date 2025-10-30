%% Diagrama de sequência: 1.Cadastro de Usuário
sequenceDiagram
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React)
    participant B as ⚙️ Back-end (Express)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)

    U->>F: Preenche formulário (nome, e-mail, senha)
    F->>B: POST /auth/register (dados do formulário)
    B->>DB: INSERT INTO users (...)
    DB-->>B: Confirma inserção
    B-->>F: Retorna sucesso + dados do novo usuário
    F-->>U: Exibe "Usuário cadastrado com sucesso!"

%% Diagrama de sequência: 2.Login do Usuário
sequenceDiagram
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React)
    participant B as ⚙️ Back-end (Express)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)

    U->>F: Envia e-mail e senha
    F->>B: POST /auth/login
    B->>DB: SELECT * FROM usuarios WHERE email = ...
    DB-->>B: Retorna usuário e hash da senha
    B->>B: Valida senha e gera token JWT
    B-->>F: Retorna token de autenticação
    F-->>U: Redireciona para página de trilhas


%% Diagrama de sequência: 3.Cadastro de Trilha (com Upload Múltiplo de Fotos)
sequenceDiagram
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React)
    participant B as ⚙️ Back-end (Express + Prisma)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)
    participant FS as Armazenamento de Arquivos (ex: Cloudinary/S3, Supabase Storage)

    %% Etapa 1 — Preenchimento do formulário
    U->>F: Preenche Nome, Estado, Cidade, Descrição e Dificuldade
    U->>F: Anexa Fotos e Arquivo (.gpx ou .kml)
    F->>B: POST /trails (JSON com dados da trilha)

    %% Etapa 2 — Criação da trilha no banco
    B->>DB: INSERT INTO trails (name, state, city, description, difficulty)
    DB-->>B: Retorna ID da trilha criada

    %% Etapa 3 — Upload de fotos
    F->>B: POST /photos (múltiplos arquivos)
    B->>FS: Salva imagens e obtém URLs públicas
    FS-->>B: Retorna URLs das fotos
    B->>DB: INSERT INTO photos (trail_id, url)
    DB-->>B: Confirma inserção

    %% Etapa 4 — Upload de arquivo GPX/KML
    F->>B: POST /files (trail_id + file.gpx/.kml)
    B->>FS: Envia arquivo e obtém URL
    FS-->>B: Retorna URL do arquivo
    B->>DB: UPDATE trails SET arquivo_url = ...

    %% Etapa 5 — Resposta final
    DB-->>B: Confirma atualização
    B-->>F: Retorna sucesso + dados completos da trilha
    F-->>U: Exibe "Trilha cadastrada com sucesso"  

%% Diagrama de sequência: 4.Listagem de Trilhas com Filtro
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React)
    participant B as ⚙️ Back-end (Express.js)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)

    %% --- PRIMEIRO CARREGAMENTO ---
    U->>F: Acessa a Home
    F->>B: GET /trails?page=1&limit=50
    B->>DB: SELECT * FROM trails ORDER BY createdAt DESC LIMIT 50 OFFSET 0
    DB-->>B: Retorna primeiras 50 trilhas
    B-->>F: JSON { trails: [...], total: 240, totalPages: 5 }
    F-->>U: Exibe as 50 trilhas iniciais

    %% --- AÇÃO DE CARREGAR MAIS ---
    U->>F: Clica em "Carregar mais"
    F->>B: GET /trails?page=2&limit=50
    B->>DB: SELECT * FROM trails ORDER BY createdAt DESC LIMIT 50 OFFSET 50
    DB-->>B: Retorna trilhas da página 2
    B-->>F: JSON { trails: [...], totalPages: 5 }
    F-->>U: Adiciona novas trilhas à listagem existente

    %% --- LOOP SE CONTINUAR ---
    loop Até última página
        U->>F: Clica novamente em "Carregar mais"
        F->>B: GET /trails?page=n&limit=50
        B->>DB: SELECT * FROM trails LIMIT 50 OFFSET (n-1)*50
        DB-->>B: Retorna trilhas da página n
        B-->>F: JSON com novas trilhas
        F-->>U: Atualiza a tela
    end

%% Diagrama de sequência: 5.Exibir Detalhes da trilha
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React/Nuxt)
    participant B as ⚙️ Backend (Express/Nest)
    participant DB as 🗄️ PostgreSQL
    participant S as ☁️ Supabase Storage

    U->>F: Clica em uma trilha ("/trails/:id")
    F->>B: GET /trails/:id
    B->>DB: Busca dados da trilha (nome, descrição, paths das fotos)
    DB-->>B: Retorna dados + paths das fotos
    B-->>F: Retorna JSON com dados e paths
    F->>S: Usa getPublicUrl(path) para obter URLs das fotos
    S-->>F: Retorna URLs públicas
    F->>U: Renderiza página de detalhes com fotos, descrição e botão “Ver mapa”

%% Diagrama de sequência: 6.(Futuro) Exibir Mapa Interativo
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (Vue/Nuxt)
    participant B as ⚙️ Backend (Node/Nest)
    participant S as 🗄️ Supabase (Banco + Storage)
    participant M as 🗺️ Mapa (Leaflet/Mapbox)

    U->>F: Clica em "Ver mapa da trilha"
    F->>B: Requisição GET /trails/:id
    B->>S: Consulta tabela "trails" (dados básicos + link do trajeto)
    S-->>B: Retorna metadados + URL do arquivo GPX/GeoJSON
    B-->>F: Retorna JSON com dados da trilha e URL do trajeto
    F->>S: Faz download do arquivo GPX/GeoJSON via URL pública
    S-->>F: Retorna arquivo com coordenadas
    F->>M: Renderiza o trajeto no mapa (polyline + marcadores)
    U->>M: Interage com o mapa (zoom, rotação, visualizar pontos)
    M-->>F: Exibe detalhes de cada ponto (altitude, distância etc.)

%% Diagrama de sequência: 7.Listar Trilhas do Usuário Logado
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React/Nuxt)
    participant B as ⚙️ Back-end (Express/Nest)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)
    participant S as ☁️ Supabase Storage

    U->>F: Acessa página "Minhas Trilhas"
    F->>B: GET /trails?userId={idUser}
    B->>DB: Consulta trilhas onde usuarioId = {idUser}
    DB-->>B: Retorna lista de trilhas (com paths das fotos)
    B-->>F: Retorna JSON com trilhas e paths
    loop Para cada trilha
        F->>S: getPublicUrl(path)
        S-->>F: Retorna URL pública da foto
    end
    F->>U: Renderiza lista de trilhas do usuário (com fotos)

%% Diagrama de sequência: 8.Cadastrar Nova Trilha
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React/Nuxt)
    participant S as ☁️ Supabase Storage
    participant B as ⚙️ Back-end (Express/Nest)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)

    U->>F: Preenche formulário de nova trilha (dados + fotos + rota)
    par Upload de fotos
        F->>S: Upload múltiplo (ex: /photos/trails/)
        S-->>F: Retorna paths das fotos
    and Upload do arquivo de rota
        F->>S: Upload do arquivo GPX/GeoJSON (ex: /routes/trails/)
        S-->>F: Retorna path do arquivo de rota
    end
    F->>B: POST /trails (dados + paths das fotos + path da rota)
    B->>DB: Insere registro da trilha (com userId e paths)
    DB-->>B: Confirma criação
    B-->>F: Retorna trilha criada (id + dados)
    F->>U: Exibe mensagem de sucesso e atualiza lista

%% Diagrama de sequência: 9.Editar Trilha 
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React/Nuxt)
    participant S as ☁️ Supabase Storage
    participant B as ⚙️ Back-end (Express/Nest)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)

    U->>F: Clica em "Editar" e altera dados, fotos e/ou rota
    alt Envia novas fotos
        F->>S: Upload das novas fotos
        S-->>F: Retorna novos paths das fotos
    end
    alt Substitui arquivo de rota
        F->>S: Upload do novo arquivo GPX/GeoJSON
        S-->>F: Retorna novo path da rota
    end
    F->>B: PUT /trails/:id (dados atualizados + novos paths)
    B->>DB: Verifica se userId = usuário logado
    DB-->>B: Autorização OK
    B->>DB: Atualiza registro da trilha (dados + paths)
    DB-->>B: Confirma atualização
    B-->>F: Retorna trilha atualizada
    F->>U: Exibe mensagem de sucesso e atualiza exibição


%% Diagrama de sequência: 10.Deletar trilha
sequenceDiagram
    autonumber
    actor U as 🧑 Usuário
    participant F as 🌐 Front-end (React/Nuxt)
    participant B as ⚙️ Back-end (Express/Nest)
    participant DB as 🗄️ Banco de Dados (PostgreSQL)
    participant S as ☁️ Supabase Storage

    U->>F: Clica em "Excluir trilha"
    F->>B: DELETE /trails/:id
    B->>DB: Verifica se usuarioId = usuário logado
    DB-->>B: Autorização OK
    B->>DB: Busca paths das fotos e da rota
    DB-->>B: Retorna paths
    par Remover fotos associadas
        B->>S: storage.remove(['/photos/trails/...'])
        S-->>B: Confirma exclusão das fotos
    and Remover arquivo de rota
        B->>S: storage.remove(['/routes/trails/...'])
        S-->>B: Confirma exclusão da rota
    end
    B->>DB: Exclui registro da trilha
    DB-->>B: Retorna sucesso
    B-->>F: Retorna status 200 OK
    F->>U: Atualiza lista e mostra mensagem de sucesso