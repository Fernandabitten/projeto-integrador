%% UC1 — Cadastrar Usuário
```mermaid
graph TD
  A1(Usuário preenche nome, email e senha)
  A1 --> A2(Front-end envia POST /auth/register)
  A2 --> A3(Back-end grava no banco)
  A3 --> A4(Sistema retorna sucesso)
```

%% UC2 — Login
```mermaid
graph TD
  B1(Usuário insere email e senha)
  B1 --> B2(Front-end POST /auth/login)
  B2 --> B3(Back-end valida credenciais)
  B3 --> B4(Gera JWT e retorna token)
```

%% UC3 — Cadastrar Trilha
```mermaid
graph TD
  C1(Usuário preenche dados da trilha)
  C1 --> C2(Anexa fotos + arquivo GPX)
  C2 --> C3(Front-end POST /trails)
  C3 --> C4(Back-end cria trilha no banco)
  C4 --> C5(Salva fotos no Storage)
  C5 --> C6(Salva GPX no Storage)
  C6 --> C7(Retorna trilha criada)

```

%% UC4 — Listar Trilhas
```mermaid
graph TD
  D1(Usuário abre a página)
  D1 --> D2(GET /trails)
  D2 --> D3(Back-end retorna trilhas)
  D3 --> D4(Front exibe lista)

```

%% UC5 — Visualizar Detalhes
```mermaid
graph TD
  E1(Usuário seleciona trilha)
  E1 --> E2(GET /trails/:id)
  E2 --> E3(Back-end retorna dados + fotos)
  E3 --> E4(Front renderiza detalhes)

```

%% UC6 — Exibir Mapa da trilha
```mermaid
graph TD
  F1(Usuário clica em Ver Mapa)
  F1 --> F2(Carrega arquivo GPX)
  F2 --> F3(Renderiza mapa interativo)
```

%% UC8 — Editar Trilha
```mermaid
graph TD
  H1(Usuário clica Editar)
  H1 --> H2(Front-end PUT /trails/:id)
  H2 --> H3(Back-end valida permissão)
  H3 --> H4(Atualiza dados)
  H4 --> H5(Retorna sucesso)
```

%% UC9 — Excluir Trilha
```mermaid
graph TD
  I1(Usuário clica Excluir)
  I1 --> I2(DELETE /trails/:id)
  I2 --> I3(Back-end valida permissão)
  I3 --> I4(Remove fotos e GPX)
  I4 --> I5(Exclui trilha do banco)
  I5 --> I6(Retorna sucesso)
```
