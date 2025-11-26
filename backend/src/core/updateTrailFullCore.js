import { prisma } from "../lib/prisma.js";
import {
  uploadPhotoStream,
  uploadFileStream,
  deleteFromSupabase,
} from "../services/uploadService.js";

const BUCKET = process.env.SUPABASE_BUCKET;

/* -----------------------------
   Helpers reutilizados
------------------------------*/
function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parsePayload(body) {
  if (!body?.data) {
    const err = new Error("Campo 'data' obrigatório (JSON string).");
    err.status = 400;
    throw err;
  }

  try {
    return JSON.parse(body.data);
  } catch {
    const err = new Error("Campo 'data' inválido: JSON esperado.");
    err.status = 400;
    throw err;
  }
}

function validatePayload(payload) {
  if (!payload.userId) {
    const err = new Error("Campo obrigatório: userId");
    err.status = 400;
    throw err;
  }
}

/* -----------------------------
   Sub-funções 
------------------------------*/

async function buscarTrilhaOuErro(id) {
  const trail = await prisma.trail.findUnique({
    where: { id: Number(id) },
    include: { photos: true },
  });

  if (!trail) {
    const err = new Error("Trilha não encontrada.");
    err.status = 404;
    throw err;
  }

  return trail;
}

function validarPermissao(trail, userId) {
  if (trail.userId !== Number(userId)) {
    const err = new Error("Você não pode editar esta trilha.");
    err.status = 403;
    throw err;
  }
}

async function atualizarDadosBasicos(id, fields) {
  const allowed = [
    "name",
    "state",
    "city",
    "description",
    "difficulty",
    "distance",
  ];
  const payload = {};

  for (const key of allowed) {
    if (key in fields) payload[key] = fields[key];
  }

  if (payload.name) {
    payload.name = toTitleCase(payload.name);
  }

  if (Object.keys(payload).length > 0) {
    await prisma.trail.update({
      where: { id: Number(id) },
      data: payload,
    });
  }
}

async function removerFotos(removedPhotos) {
  for (const photoId of removedPhotos) {
    const photo = await prisma.photo.findUnique({
      where: { id: Number(photoId) },
    });

    if (photo) {
      await deleteFromSupabase(photo.path);
      await prisma.photo.delete({ where: { id: Number(photoId) } });
    }
  }
}

async function adicionarNovasFotos(id, req) {
  const photoFiles = req.files?.photos || [];
  const data = [];

  for (const file of photoFiles) {
    const uploaded = await uploadPhotoStream(String(id), file);
    data.push({
      url: uploaded.url,
      path: uploaded.path,
      trailId: Number(id),
    });
  }

  if (data.length > 0) {
    await prisma.photo.createMany({ data });
  }
}

function extractPathFromUrl(url, bucketName) {
  if (!url) return null;
  const regex = new RegExp(`^.*?/${bucketName}/(.*)$`);
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function substituirGpx(trail, id, req) {
  const gpxFile = req.files?.gpx?.[0];

  if (!gpxFile) return;

  // deletar gpx antigo
  if (trail.gpxUrl) {
    const path = extractPathFromUrl(trail.gpxUrl, BUCKET);
    if (path) await deleteFromSupabase(path);
  }

  // enviar novo
  const uploaded = await uploadFileStream(String(id), gpxFile);

  await prisma.trail.update({
    where: { id: Number(id) },
    data: { gpxUrl: uploaded.url },
  });
}

async function buscarTrilhaCompleta(id) {
  return await prisma.trail.findUnique({
    where: { id: Number(id) },
    include: { photos: true },
  });
}

/* -----------------------------
   FUNÇÃO PRINCIPAL
------------------------------*/

export async function updateTrailFullCore(req) {
  // Parse + valida payload
  const payload = parsePayload(req.body);
  validatePayload(payload);

  const { userId, removedPhotos = [], ...fields } = payload;
  const { id } = req.params;

  // Buscar trilha e validar permissão
  const trail = await buscarTrilhaOuErro(id);
  validarPermissao(trail, userId);

  // Atualizar texto/infos básicas
  await atualizarDadosBasicos(id, fields);

  // Remover fotos
  await removerFotos(removedPhotos);

  // Upload de novas fotos
  await adicionarNovasFotos(id, req);

  // Substituir GPX
  await substituirGpx(trail, id, req);

  // Retornar trilha completa
  return await buscarTrilhaCompleta(id);
}
