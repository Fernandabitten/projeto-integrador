%% Diagrama de sequência: 1.Cadastro de Usuário
```mermaid
sequenceDiagram
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados

    U->>F: Preenche formulario
    F->>B: POST /auth/register
    B->>DB: INSERT INTO users
    DB-->>B: Confirmacao
    B-->>F: Sucesso
    F-->>U: Usuario cadastrado
```

%% Diagrama de sequência: 2.Login do Usuário
```mermaid
sequenceDiagram
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados

    U->>F: Envia email e senha
    F->>B: POST /auth/login
    B->>DB: SELECT usuario
    DB-->>B: Retorna dados
    B->>B: Valida senha e gera JWT
    B-->>F: Token de autenticacao
    F-->>U: Redireciona para trilhas
```

%% Diagrama de sequência: 3.Cadastro de Trilha (com Upload Múltiplo de Fotos)
```mermaid
sequenceDiagram
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados
    participant FS as FileStorage

    U->>F: Preenche dados e anexa fotos
    F->>B: POST /trails
    B->>DB: INSERT INTO trails
    DB-->>B: Retorna ID da trilha

    F->>B: POST /photos
    B->>FS: Upload fotos
    FS-->>B: Retorna URLs
    B->>DB: INSERT INTO photos
    DB-->>B: Confirmacao

    F->>B: POST /files
    B->>FS: Upload arquivo rota
    FS-->>B: Retorna URL
    B->>DB: UPDATE trails

    DB-->>B: Confirmacao
    B-->>F: Sucesso
    F-->>U: Trilha cadastrada

```

%% Diagrama de sequência: 4.Listagem de Trilhas com Filtro
```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados

    U->>F: Acessa Home
    F->>B: GET /trails?page=1
    B->>DB: SELECT trilhas pagina 1
    DB-->>B: Retorna trilhas
    B-->>F: JSON trilhas
    F-->>U: Exibe trilhas

    U->>F: Carregar mais
    F->>B: GET /trails?page=2
    B->>DB: SELECT pagina 2
    DB-->>B: Retorna trilhas
    B-->>F: JSON trilhas
    F-->>U: Atualiza listagem
```

%% Diagrama de sequência: 5.Exibir Detalhes da trilha
```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados
    participant S as Storage

    U->>F: Acessa /trails/:id
    F->>B: GET /trails/:id
    B->>DB: Busca dados da trilha
    DB-->>B: Retorna dados
    B-->>F: JSON dados + paths fotos
    F->>S: getPublicUrl
    S-->>F: Retorna URLs
    F-->>U: Exibe detalhes da trilha

```

%% Diagrama de sequência: 6.(Futuro) Exibir Mapa Interativo
```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant S as Supabase
    participant M as Mapa

    U->>F: Clica em Ver mapa
    F->>B: GET /trails/:id
    B->>S: Consulta dados + arquivo rota
    S-->>B: Retorna metadados
    B-->>F: JSON com arquivo rota
    F->>S: Download arquivo GPX
    S-->>F: Retorna arquivo
    F->>M: Renderiza mapa
    M-->>U: Exibe trajeto
```

%% Diagrama de sequência: 7.Listar Trilhas do Usuário Logado
```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados
    participant S as Storage

    U->>F: Acessa MinhasTrilhas
    F->>B: GET /trails?userId={id}
    B->>DB: SELECT trilhas do usuario
    DB-->>B: Retorna trilhas
    B-->>F: JSON trilhas

    loop Para cada trilha
        F->>S: getPublicUrl
        S-->>F: Retorna URL
    end

    F-->>U: Renderiza trilhas do usuario
```

%% Diagrama de sequência: 8.Editar Trilha 
```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados
    participant S as Storage

    U->>F: Envia dados da edição (multipart/form-data)
    F->>B: PUT /trails/:id com body e arquivos

    B->>B: parsePayload()
    B->>B: validatePayload()

    B->>DB: buscarTrilhaOuErro(id)
    DB-->>B: Retorna trilha

    B->>B: validarPermissao()

    B->>DB: atualizarDadosBasicos()
    DB-->>B: OK

    alt Remover fotos antigas
        B->>DB: Buscar cada foto removida
        DB-->>B: Retorna foto
        B->>S: deleteFromSupabase(path)
        S-->>B: OK
        B->>DB: DELETE photo
        DB-->>B: OK
    end

    alt Upload de novas fotos
        F->>B: Envia arquivos "photos"
        B->>S: uploadPhotoStream()
        S-->>B: Retorna url/path
        B->>DB: createMany() das novas fotos
        DB-->>B: OK
    end

    alt Substituir GPX
        F->>B: Envia arquivo "gpx"
        B->>B: calculateDistance(tempFile)
        B->>S: deleteFromSupabase(gpx antigo)
        S-->>B: OK
        B->>S: uploadFileStream(novo gpx)
        S-->>B: Retorna nova url
        B->>DB: UPDATE trilha com nova gpxUrl e distance
        DB-->>B: OK
        B->>B: fs.unlink(tempFile)
    end

    B->>DB: buscarTrilhaCompleta()
    DB-->>B: Retorna trilha atualizada

    B-->>F: JSON trilha atualizada
    F-->>U: Exibe sucesso

```

%% Diagrama de sequência: 9.Deletar trilha
```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant F as FrontEnd
    participant B as BackEnd
    participant DB as BancoDeDados
    participant S as Storage

    U->>F: Excluir trilha
    F->>B: DELETE /trails/:id
    B->>DB: Verifica proprietario
    DB-->>B: Autorizado

    B->>DB: Busca paths
    DB-->>B: Retorna paths

    par Remover fotos
        B->>S: delete fotos
        S-->>B: Confirmacao
    and Remover rota
        B->>S: delete arquivo rota
        S-->>B: Confirmacao
    end

    B->>DB: DELETE trilha
    DB-->>B: Sucesso
    B-->>F: OK
    F-->>U: Lista atualizada
```

