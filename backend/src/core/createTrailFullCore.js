import { prisma } from "../lib/prisma.js";
import {
  uploadPhotoStream,
  uploadFileStream,
} from "../services/uploadService.js";
import { calculateDistance } from "../utils/gpxUtils.js";
import fs from "fs/promises"; //  Necessário para a limpeza do arquivo temporário

function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parsePayload(body) {
  if (!body?.data) {
    const error = new Error("Campo 'data' obrigatório (JSON string).");
    error.status = 400;
    throw error;
  }

  try {
    return JSON.parse(body.data);
  } catch {
    const error = new Error("Campo 'data' inválido: JSON esperado.");
    error.status = 400;
    throw error;
  }
}

function validatePayload(payload) {
  const required = [
    "name",
    "state",
    "city",
    "description",
    "difficulty",
    "distance",
    "userId",
  ];

  for (const field of required) {
    if (
      payload[field] === undefined ||
      payload[field] === null ||
      payload[field] === ""
    ) {
      const error = new Error(`Campo obrigatório ausente: ${field}`);
      error.status = 400;
      throw error;
    }
  }
}

export async function createTrailFullCore(req) {
  // Parse + validação
  const data = parsePayload(req.body);
  validatePayload(data);

  const { name, state, city, description, difficulty, distance, userId } = data;

  const gpxFiles = req.files?.gpx || [];
  let finalDistance = Number(distance) || 0;
  let gpxTempPath = null;

  if (gpxFiles.length > 0) {
    gpxTempPath = gpxFiles[0].path; // Salva o caminho temporário

    // Calcula a distância.
    const calculated = await calculateDistance(gpxTempPath);

    if (calculated > 0) {
      finalDistance = calculated;
    }
  }

  const formattedName = toTitleCase(name);

  // Criar trilha
  const trail = await prisma.trail.create({
    data: {
      name: formattedName,
      state,
      city,
      description,
      difficulty,
      distance: finalDistance, // Usando a distância CALCULADA
      userId: Number(userId),
    },
  });

  const trailId = String(trail.id);

  // Upload das fotos
  const photosFiles = req.files?.photos || [];
  const photosData = [];

  for (const file of photosFiles) {
    const uploaded = await uploadPhotoStream(trailId, file);
    photosData.push({
      url: uploaded.url,
      path: uploaded.path,
      trailId: Number(trailId),
    });
  }

  if (photosData.length > 0) {
    await prisma.photo.createMany({ data: photosData });
  }

  // Upload GPX
  let gpxUrl = null;

  if (gpxFiles.length > 0) {
    // Primeiro faz o upload (usando o caminho que ainda existe)
    const uploadedGpx = await uploadFileStream(trailId, gpxFiles[0]);
    gpxUrl = uploadedGpx.url;

    await prisma.trail.update({
      where: { id: Number(trailId) },
      data: { gpxUrl },
    });

    // Limpeza final do GPX
    if (gpxTempPath) {
      try {
        await fs.unlink(gpxTempPath); // Deleta o arquivo temporário APÓS o upload
      } catch (e) {
        // Apenas loga o erro, não falha a transação se a limpeza falhar
        console.warn("⚠️ Erro ao limpar arquivo temporário do GPX:", e.message);
      }
    }
  }

  // Retorna a trilha completa
  const fullTrail = await prisma.trail.findUnique({
    where: { id: Number(trailId) },
    include: { photos: true },
  });

  return fullTrail;
}
