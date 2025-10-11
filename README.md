# 🌄 Trilha Conectada – Aplicação para Trilheiros

## 👥 Equipe
- Fernanda Barbosa Bittencourt  
- Grazi  
- Ricardo  

---

## 🎯 Tema do Projeto
**Trilha Conectada** é uma plataforma voltada para pessoas que praticam trilhas, permitindo **registrar rotas, avaliar percursos e compartilhar experiências** com outros trilheiros.  
O objetivo é conectar aventureiros e ajudar na descoberta de novos caminhos, com informações sobre **nível de dificuldade, distância, localização e fotos** das trilhas.

---

## ⚙️ Funcionalidades Iniciais
1. **Cadastrar usuário** (nome, e-mail, senha).  
2. **Cadastrar trilhas** (nome, localização, distância, nível de dificuldade, descrição e fotos).  
3. **Listar trilhas** (com filtros por cidade ou dificuldade).  
4. **Upload de múltiplas fotos por trilha** (visualização em carrossel).  

> *Futuras melhorias: mapa interativo, avaliações, favoritos, comentários e compartilhamento.*

---

## 🧩 Mapeamento Inicial das Camadas

| Camada | Função |
|--------|--------|
| **Front-end (React.js)** | Formulários de cadastro e login, tela de listagem de trilhas, cadastro de trilha com upload múltiplo de fotos |
| **Back-end (Express.js, Prisma)** | Endpoints de autenticação, CRUD de trilhas e gerenciamento de fotos |
| **Banco de Dados (PostgreSQL)** | Tabelas de usuários, trilhas, fotos e consultas otimizadas por cidade e dificuldade

---

## 🗺️ Esboço de Arquitetura (Fluxo Simplificado)

```
[Usuário]
    ⬇️  
[Front-end - React]
• Formulários (cadastro/login)
• Tela de listagem e cadastro de trilhas
• Upload múltiplo de fotos
• Envio de requisições HTTP (Axios/Fetch)
    ⬇️ 
[Back-end - Express]
• Validação de dados
• Regras de negócio
• Upload e tratamento de imagens
• ORM (Prisma)
    ⬇️ 
[Banco de Dados - PostgreSQL]
• Persistência das informações (usuários, trilhas e fotos)
• Consultas e filtragens
```