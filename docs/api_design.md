# API Design — Projeto Trilhas

Documentação do design inicial da API com base nos **diagramas de sequência** do projeto.  
A aplicação tem como foco o **cadastro de trilhas**, **autenticação de usuários** e **upload de mídias (fotos e rotas)**.

---

## 1. Recursos da API (Resources)

A API contará com os seguintes recursos principais:

| Recurso       | Descrição                                                       |
| ------------- | --------------------------------------------------------------- |
| **/auth**     | Autenticação e cadastro de usuários                             |
| **/usuarios** | Gerenciamento de usuários (opcional, para fins administrativos) |
| **/trails**   | Cadastro e listagem de trilhas                                  |
| **/photos**   | Upload e gerenciamento de fotos de trilhas                      |
| **/files**    | Upload de arquivos GPX/GeoJSON relacionados às trilhas          |

---

## 2. Tabela de Endpoints (Rotas REST Planejadas)

| Recurso      | Verbo  | Endpoint              | Descrição                                                     |
| ------------ | ------ | --------------------- | ------------------------------------------------------------- |
| **Auth**     | POST   | `/auth/register`      | Cadastro de novo usuário                                      |
| **Auth**     | POST   | `/auth/login`         | Login do usuário (gera token JWT)                             |
| **Usuário**  | GET    | `/usuarios/{id}`      | Buscar dados de um usuário específico                         |
| **Trilhas**  | POST   | `/trails`             | Criar nova trilha (dados básicos)                             |
| **Trilhas**  | GET    | `/trails`             | Listar trilhas com paginação e filtros (`?page=1&limit=50`)   |
| **Trilhas**  | GET    | `/trails/{id}`        | Buscar detalhes de uma trilha (dados, fotos, arquivo de rota) |
| **Trilhas**  | GET    | `/trails?userId={id}` | Listar trilhas criadas por um usuário                         |
| **Trilhas**  | PUT    | `/trails/{id}`        | Editar trilha existente (dados, fotos e rota)                 |
| **Trilhas**  | DELETE | `/trails/{id}`        | Deletar trilha e mídias associadas                            |
| **Fotos**    | POST   | `/photos`             | Upload múltiplo de fotos associadas a uma trilha              |
| **Arquivos** | POST   | `/files`              | Upload de arquivo GPX ou GeoJSON de uma trilha                |

---

## 3. Exemplos de Request e Response (JSON)
### **POST /auth/register**
**Request**
```json
{
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "senha": "123456"
}
```
**Response (201 Created)**
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@example.com"
}
```
---
### **POST /auth/login**
**Request**
```json
{
  "email": "maria@example.com",
  "senha": "123456"
}
```
**Response (200 OK)**
```json
{
  "token": "jwt_token_exemplo",
  "usuarioId": 1
}
```
---
### **GET /usuarios**
**Response (200 OK)**
```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@example.com"
  }
]
```
---
### **GET /usuarios/{id}**
**Response (200 OK)**
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@example.com"
}
```
---
### **POST /trails**
**Request**
```json
{
  "titulo": "Trilha de HTML",
  "descricao": "Aprenda HTML do básico ao avançado"
}
```
**Response (201 Created)**
```json
{
  "id": 10,
  "titulo": "Trilha de HTML",
  "descricao": "Aprenda HTML do básico ao avançado"
}
```
---
### **GET /trails**
**Response (200 OK)**
```json
[
  {
    "id": 10,
    "titulo": "Trilha de HTML",
    "descricao": "Aprenda HTML do básico ao avançado"
  }
]
```
---
### **POST /activities**
**Request**
```json
{
  "trailId": 10,
  "titulo": "Introdução ao HTML",
  "conteudo": "Tags básicas e estrutura inicial"
}
```
**Response (201 Created)**
```json
{
  "id": 50,
  "trailId": 10,
  "titulo": "Introdução ao HTML",
  "conteudo": "Tags básicas e estrutura inicial"
}
```
---
### **GET /activities?trailId=10**
**Response (200 OK)**
```json
[
  {
    "id": 50,
    "trailId": 10,
    "titulo": "Introdução ao HTML",
    "conteudo": "Tags básicas e estrutura inicial"
  }
]
```
---
### **POST /progress**
**Request**
```json
{
  "usuarioId": 1,
  "activityId": 50,
  "status": "concluido"
}
```
**Response (201 Created)**
```json
{
  "id": 300,
  "usuarioId": 1,
  "activityId": 50,
  "status": "concluido"
}
```
---
### **GET /progress/{userId}**
**Response (200 OK)**
```json
[
  {
    "id": 300,
    "usuarioId": 1,
    "activityId": 50,
    "status": "concluido"
  }
]
```
---

## 4. Status Codes previstos por rota

| Rota                     | Sucesso        | Erros possíveis                                                                                                             |
| ------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| POST`/auth/register`     | 201 Created    | 400 (dados inválidos), 409 (email já existe)                                                                                |
| POST`/auth/login`        | 200 OK         | 400 (dados inválidos), 401 (senha incorreta ou usuário não autenticado), 404 (usuário não encontrado)                       |
| GET`/usuarios/{id}`      | 200 OK         | 400 (ID inválido), 404 (usuário não encontrado)                                                                             |
| POST`/trails`            | 201 Created    | 400 (dados inválidos), 401 (não autenticado), 422 (formato inválido de foto/arquivo)                                        |
| GET`/trails`             | 200 OK         | 400 (parâmetros inválidos: page/limit)                                                                                      |
| GET`/trails/{id}`        | 200 OK         | 400 (ID inválido), 404 (trilha não encontrada)                                                                              |
| GET`/trails?userId={id}` | 200 OK         | 400 (ID inválido), 404 (usuário não encontrado)                                                                             |
| PUT`/trails/{id}`        | 200 OK         | 400 (dados inválidos), 401 (não autenticado), 403 (usuário não é dono da trilha), 404 (trilha não encontrada)               |
| DELETE`/trails/{id}`     | 204 No Content | 401 (não autenticado), 403 (usuário não é dono da trilha), 404 (trilha não encontrada)                                      |
| POST`/photos`            | 201 Created    | 400 (nenhuma foto enviada), 401 (não autenticado), 413 (arquivo muito grande), 415 (tipo de arquivo não suportado)          |
| POST`/files`             | 201 Created    | 400 (arquivo ausente), 401 (não autenticado), 413 (arquivo muito grande), 415 (formato inválido: aceita apenas GPX/GeoJSON) |
