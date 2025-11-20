import { trails } from "../data/trails.js";
import { createTrailCore } from "../core/createTrailCore.js";
import { updateTrailCore } from "../core/updateTrailCore.js";
import { deleteTrailCore } from "../core/deleteTrailCore.js";

import { sendSuccess, sendError } from "../utils/httpResponses.js";

/* =================================
      GET /trails  
================================= */
export function listTrails(req, res) {
  const { page, limit } = req.query;

  if (page && isNaN(page)) {
    return sendError(res, 400, "Parâmetro 'page' inválido.");
  }
  if (limit && isNaN(limit)) {
    return sendError(res, 400, "Parâmetro 'limit' inválido.");
  }

  // listagem não precisa de core (igual produtos)
  return sendSuccess(res, 200, trails);
}

/* =================================
      POST /trails  
================================= */
export function createTrail(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return sendError(res, 401, "Usuário não autenticado.");
    }

    const novaTrail = createTrailCore(req.body);
    trails.push(novaTrail);

    return sendSuccess(res, 201, novaTrail);

  } catch (error) {
    return sendError(res, 400, error.message);
  }
}

/* =================================
      PUT /trails/:id
================================= */
export function updateTrail(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return sendError(res, 401, "Usuário não autenticado.");
    }

    const atualizada = updateTrailCore(trails, id, req.body, userId);

    return sendSuccess(res, 200, atualizada);

  } catch (error) {
    return sendError(res, error.status || 400, error.message);
  }
}

/* =================================
      DELETE /trails/:id
================================= */
export function deleteTrail(req, res) {
  try {
    const { id } = req.params;
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return sendError(res, 401, "Usuário não autenticado.");
    }

    deleteTrailCore(trails, id, userId);

    return sendSuccess(res, 200, null, "Trilha deletada com sucesso.");

  } catch (error) {
    return sendError(res, error.status || 400, error.message);
  }
}
