import { sendSuccess, sendError } from "../utils/httpResponses.js";
import { createTrailCore } from "../core/createTrailCore.js";
import { updateTrailCore } from "../core/updateTrailCore.js";
import { deleteTrailCore } from "../core/deleteTrailCore.js";
import { createTrailFullCore } from "../core/createTrailFullCore.js";
import { updateTrailFullCore } from "../core/updateTrailFullCore.js";
import { prisma } from "../lib/prisma.js";
import { deleteFromSupabase } from "../services/uploadService.js";

const BUCKET = process.env.SUPABASE_BUCKET;

export const listTrails = async (req, res) => {
  try {
    const trails = await prisma.trail.findMany({
      include: { photos: true },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, 200, trails);
  } catch (err) {
    return sendError(res, 500, "Erro ao listar trilhas.");
  }
};

export async function createTrail(req, res) {
  try {
    // req.user.id (do authMiddleware)
    const payload = { ...req.body, userId: req.user.id };
    const newTrail = await createTrailCore(payload);
    return sendSuccess(res, 201, newTrail);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

export async function updateTrail(req, res) {
  try {
    const { id } = req.params;
    const payload = { ...req.body, userId: req.user.id };
    const updated = await updateTrailCore(Number(id), payload);
    return sendSuccess(res, 200, updated);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
}

export const deleteTrail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deleteTrailCore(id, userId);

    return sendSuccess(res, 200, null, "Trilha deletada com sucesso.");
  } catch (err) {
    console.error(err);
    return sendError(res, 400, err.message || "Erro ao deletar trilha.");
  }
};

export async function createTrailFull(req, res) {
  try {
    const result = await createTrailFullCore(req);

    return sendSuccess(res, 201, result, "Trilha criada com sucesso.");
  } catch (err) {
    console.error("[createTrailFull] erro:", err);
    return sendError(res, err.status || 500, err.message);
  }
}

export async function updateTrailFull(req, res) {
  try {
    const result = await updateTrailFullCore(req);
    return sendSuccess(res, 200, result, "Trilha editada com sucesso.");
  } catch (err) {
    console.error("[updateTrailFull] erro:", err);
    return sendError(res, err.status || 500, err.message);
  }
}
