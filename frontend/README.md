# ⚛️ Frontend | Trilha Conectada UI

O frontend é uma **Single Page Application (SPA)** construída com **React** e **Vite**, projetada para ser rápida, responsiva e intuitiva.

## ✨ Características e Estilização

* **Componentização:** Interface totalmente modular, facilitando a reutilização de elementos.
* **Estilização:** Utiliza **Tailwind CSS** para um fluxo de desenvolvimento *utility-first* e rápido.
* **Visualização de Mapas:** Integração com **Leaflet** e **leaflet-gpx** para renderizar os dados geoespaciais.
* **Gráficos:** Utiliza **ApexCharts** para visualização de estatísticas da trilha (elevação, velocidade, etc.).

## 🛠️ Instalação e Execução

1.  **Navegue para a pasta:**
    ```bash
    cd frontend
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente (`.env`):**
    Crie um arquivo `.env` na raiz do frontend e aponte para a URL da sua API:

    ```env
    # URL da API do Backend
    VITE_API_URL=http://localhost:3000
    ```

4.  **Iniciar a Aplicação (Desenvolvimento):**
    ```bash
    npm run dev
    ```
    O frontend estará disponível em `http://localhost:5173` (ou porta definida pelo Vite).

## 🚀 Scripts Úteis

| Script | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento com *Hot Reload*. |
| `npm run build` | Cria a *build* otimizada para produção na pasta `dist/`. |
| `npm run lint` | Executa o linter para verificar problemas de qualidade de código. |
| `npm run format` | Executa o Prettier para formatar e padronizar todo o código. |

## 🎨 Design System e Padrões

O projeto segue a convenção de **Design de Componentes** do React, com ênfase na manutenção de um código limpo e de fácil leitura, garantido pelas ferramentas **ESLint** e **Prettier**.

* **Estilização:** Utiliza a metodologia *utility-first* do **Tailwind CSS**.
* **Ícones:** Utiliza a biblioteca **Lucide React** para todos os ícones da interface.

### Protótipo e Guia Visual (Figma)

Todo o Design System, componentes e telas da aplicação foram prototipados no Figma. Esta é a **fonte primária de verdade** para as especificações de espaçamento, tipografia, cores e fluxo de usuário.

* **Link de Referência do Figma:** [Acessar Protótipo para Implementação](https://www.figma.com/design/n6hWPosDaxt1cKiuOyZ2aV/Sem-t%C3%ADtulo?node-id=2-39&p=f&t=6yJqPHAnosw746PI-0)

---
