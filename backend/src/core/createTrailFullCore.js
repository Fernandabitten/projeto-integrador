import { prisma } from "../lib/prisma.js";
import {
  uploadPhotoStream,
  uploadFileStream,
} from "../services/uploadService.js";

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
  // 1️⃣ Parse + validação
  const data = parsePayload(req.body);
  validatePayload(data);

  const { name, state, city, description, difficulty, distance, userId } = data;

  const formattedName = toTitleCase(name);

  // 2️⃣ Criar trilha
  const trail = await prisma.trail.create({
    data: {
      name: formattedName,
      state,
      city,
      description,
      difficulty,
      distance: Number(distance) || 0,
      userId: Number(userId),
    },
  });

  const trailId = String(trail.id);

  // 3️⃣ Upload das fotos
  const photosFiles = req.files?.photos || [];
  const photosData = [];

  for (const file of photosFiles) {
    const uploaded = await uploadPhotoStream(trailId, file); // retorna { url, path }
    photosData.push({
      url: uploaded.url,
      path: uploaded.path,
      trailId: Number(trailId),
    });
  }

  if (photosData.length > 0) {
    await prisma.photo.createMany({ data: photosData });
  }

  // 4️⃣ Upload GPX
  let gpxUrl = null;
  const gpxFiles = req.files?.gpx || [];

  if (gpxFiles.length > 0) {
    const uploadedGpx = await uploadFileStream(trailId, gpxFiles[0]);
    gpxUrl = uploadedGpx.url;

    await prisma.trail.update({
      where: { id: Number(trailId) },
      data: { gpxUrl },
    });
  }

  // 5️⃣ Retornar trilha completa
  const fullTrail = await prisma.trail.findUnique({
    where: { id: Number(trailId) },
    include: { photos: true },
  });

  return fullTrail;
}
