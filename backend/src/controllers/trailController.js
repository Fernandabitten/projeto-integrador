import { sendSuccess, sendError } from "../utils/httpResponses.js";

// Simulação de base de dados em memória
const trails = [
  // ... SEU ARRAY DE TRILHAS AQUI (mantenha igual)
];

/* ================================
      GET /trails  
================================ */
export const listTrails = (req, res) => {
  const { page, limit } = req.query;

  if (page && isNaN(page)) {
    return sendError(res, 400, "Parâmetro 'page' inválido.");
  }
  if (limit && isNaN(limit)) {
    return sendError(res, 400, "Parâmetro 'limit' inválido.");
  }

  return sendSuccess(res, 200, trails);
};

/* ================================
      POST /trails
================================ */
export const createTrail = (req, res) => {
  const { name, state, city, description, difficulty, distance, userId } = req.body;

  if (!name || !state || !city || !description || !difficulty || !distance) {
    return sendError(res, 400, "Dados obrigatórios ausentes.");
  }

  if (!userId) {
    return sendError(res, 401, "Usuário não autenticado.");
  }

  const newTrail = {
    id: "t-" + Date.now(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  trails.push(newTrail);

  return sendSuccess(res, 201, newTrail);
};

/* ================================
      PUT /trails/:id
================================ */
export const updateTrail = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const trail = trails.find((t) => t.id === id);

  if (!trail) {
    return sendError(res, 404, "Trilha não encontrada.");
  }

  if (!userId) {
    return sendError(res, 401, "Usuário não autenticado.");
  }

  if (trail.userId !== userId) {
    return sendError(res, 403, "Você não tem permissão para editar esta trilha.");
  }

  Object.assign(trail, req.body, { updatedAt: new Date() });

  return sendSuccess(res, 200, trail);
};

/* ================================
      DELETE /trails/:id
================================ */
export const deleteTrail = (req, res) => {
  const { id } = req.params;
  const userId = req.headers["x-user-id"];

  const index = trails.findIndex((t) => t.id === id);

  if (index === -1) {
    return sendError(res, 404, "Trilha não encontrada.");
  }

  const trail = trails[index];

  if (!userId) {
    return sendError(res, 401, "Usuário não autenticado.");
  }

  if (trail.userId !== userId) {
    return sendError(res, 403, "Você não pode excluir esta trilha.");
  }

  trails.splice(index, 1);

  return sendSuccess(res, 200, null, "Trilha deletada com sucesso.");
};
