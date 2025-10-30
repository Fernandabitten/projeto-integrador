## 🗺️ Diagrama de Classes
![classes](../img/diagrama_classes.png)

**Descrição:**  
Mostra as **entidades do sistema**, seus **atributos** e **relacionamentos**.  
O diagrama abaixo representa a estrutura básica de um sistema de gerenciamento de trilhas, com usuários, fotos e arquivos associados.

---

**Principais classes e relações:**

- **Classe `User`**  
  - **Atributos:** `id`, `name`, `email`, `passwordHash`, `createdAt`, `updatedAt`  
  - **Descrição:** Representa o usuário do sistema, responsável por criar e gerenciar trilhas.  

- **Classe `Trail`**  
  - **Atributos:** `id`, `name`, `state`, `city`, `description`, `difficulty`, `filePath`, `createdAt`, `updatedAt`, `userId`, `photos`, `file`  
  - **Descrição:** Representa uma trilha cadastrada no sistema, contendo informações sobre localização, dificuldade e mídias associadas.  

- **Classe `Photo`**  
  - **Atributos:** `id`, `url`, `path`, `trailId`, `createdAt`  
  - **Descrição:** Representa uma imagem vinculada a uma trilha, armazenando seu caminho e URL pública.  

- **Classe `File`**  
  - **Atributos:** `id`, `path`, `type`, `url`, `trailId`, `createdAt`  
  - **Descrição:** Representa um arquivo associado a uma trilha, podendo incluir mapas, documentos ou registros GPS.  

---

**Relacionamentos:**

- `User "1" --> "0..*" Trail`  
  🔹 *Um usuário pode criar várias trilhas.*

- `Trail "1" --> "0..*" Photo`  
  🔹 *Uma trilha pode possuir várias fotos associadas.*

- `Trail "1" --> "0..*" File`  
  🔹 *Uma trilha pode possuir vários arquivos associados.*

---

**Atualizado em:** 🗓️ *30/10/2025* — **Ricardo**
