flowchart TD
  %% Título
  A[📘 Descrição dos Casos de Uso — Sistema Trilhas Conectadas]

  %% UC1
  subgraph UC1[🟦 UC1 — Cadastrar Usuário]
    direction TB
    A1(Ator principal: Usuário)
    A2(Objetivo: Criar uma conta para acessar o sistema)
    A3 --- |Fluxo principal| A4(O usuário preenche nome, e-mail e senha)
    A4 --> A5(Front-end envia POST /auth/register)
    A5 --> A6(Back-end grava no banco de dados)
    A6 --> A7(Sistema exibe sucesso)
  end

  %% UC2
  subgraph UC2[🟦 UC2 — Fazer Login]
    direction TB
    B1(Ator principal: Usuário)
    B2(Objetivo: Autenticar e acessar o sistema)
    B3 --- |Fluxo principal| B4(O usuário informa e-mail e senha)
    B4 --> B5(Front-end envia POST /auth/login)
    B5 --> B6(Back-end valida e gera token JWT)
    B6 --> B7(Sistema retorna token e direciona para trilhas)
  end

  %% UC3
  subgraph UC3[🟦 UC3 — Cadastrar Trilha]
    direction TB
    C1(Ator principal: Usuário)
    C2(Objetivo: Registrar trilha com fotos e rota)
    C3 --- |Fluxo principal| C4(Usuário preenche informações da trilha)
    C4 --> C5(Usuário anexa fotos e arquivo GPX/KML)
    C5 --> C6(Front-end envia POST /trails)
    C6 --> C7(Back-end grava trilha e arquivos no Storage)
    C7 --> C8(Sistema exibe sucesso)
  end

  %% UC4
  subgraph UC4[🟦 UC4 — Listar Trilhas]
    direction TB
    D1(Ator principal: Usuário)
    D2(Objetivo: Exibir trilhas com paginação)
    D3 --- |Fluxo principal| D4(Usuário acessa página inicial)
    D4 --> D5(Front-end GET /trails?page=1&limit=50)
    D5 --> D6(Back-end busca trilhas)
    D6 --> D7(Interface exibe trilhas e carrega mais sob demanda)
  end

  %% UC5
  subgraph UC5[🟦 UC5 — Visualizar Detalhes da Trilha]
    direction TB
    E1(Ator principal: Usuário)
    E2(Objetivo: Consultar informações completas da trilha)
    E3 --- |Fluxo principal| E4(Usuário seleciona uma trilha)
    E4 --> E5(Front-end GET /trails/:id)
    E5 --> E6(Back-end retorna informações e caminhos das fotos)
    E6 --> E7(Front-end gera URLs públicas e exibe detalhes)
  end

  %% UC6
  subgraph UC6[🟦 UC6 — Exibir Mapa Interativo (Futuro)]
    direction TB
    F1(Ator principal: Usuário)
    F2(Objetivo: Visualizar trajeto no mapa)
    F3 --- |Fluxo principal| F4(Usuário clica "Ver mapa")
    F4 --> F5(Sistema carrega arquivo GPX/GeoJSON)
    F5 --> F6(Mapa é renderizado com trajeto)
    F6 --> F7(Usuário interage com o mapa)
  end

  %% UC7
  subgraph UC7[🟦 UC7 — Listar Trilhas do Usuário]
    direction TB
    G1(Ator principal: Usuário autenticado)
    G2(Objetivo: Listar trilhas criadas pelo usuário)
    G3 --- |Fluxo principal| G4(Usuário acessa "Minhas Trilhas")
    G4 --> G5(GET /trails?userId={idUser})
    G5 --> G6(Back-end retorna trilhas do usuário)
    G6 --> G7(Front-end exibe lista com fotos)
  end

  %% UC8
  subgraph UC8[🟦 UC8 — Editar Trilha]
    direction TB
    H1(Ator principal: Usuário autenticado)
    H2(Objetivo: Atualizar dados, fotos ou rota)
    H3 --- |Fluxo principal| H4(Usuário clica em "Editar")
    H4 --> H5(Front-end envia PUT /trails/:id)
    H5 --> H6(Back-end valida autor da trilha)
    H6 --> H7(Sistema atualiza e retorna sucesso)
  end

  %% UC9
  subgraph UC9[🟦 UC9 — Excluir Trilha]
    direction TB
    I1(Ator principal: Usuário autenticado)
    I2(Objetivo: Remover trilha e arquivos associados)
    I3 --- |Fluxo principal| I4(Usuário clica em "Excluir trilha")
    I4 --> I5(Front-end DELETE /trails/:id)
    I5 --> I6(Back-end valida permissão e busca arquivos)
    I6 --> I7(Sistema remove arquivos no storage)
    I7 --> I8(Registro excluído no banco)
    I8 --> I9(Sistema confirma e atualiza lista)
  end

  %% Observações
  Z1[💬 Observação:\n- UC3 a UC9 exigem autenticação\n- UC1 e UC2 são pré-requisitos\n- UC6 é extensão do UC5]

  
