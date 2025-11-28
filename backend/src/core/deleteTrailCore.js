import { prisma } from "../lib/prisma.js";
import { deleteFromSupabase } from "../services/uploadService.js";

const BUCKET = process.env.SUPABASE_BUCKET;

function extractPathFromUrl(url, bucketName) {
  if (!url) return null;

  const regex = new RegExp(`${bucketName}/([^?]+)`);
  const match = url.match(regex);

  return match ? match[1] : null;
}

export async function deleteTrailCore(trailId, userId) {
  const trail = await prisma.trail.findUnique({
    where: { id: Number(trailId) },
    include: { photos: true },
  });

  if (!trail) throw new Error("Trilha não encontrada.");
  if (trail.userId !== userId)
    throw new Error("Você não pode excluir esta trilha.");

  // 1 — deletar fotos
  for (const photo of trail.photos) {
    if (!photo.path) continue;

    try {
      await deleteFromSupabase(photo.path);
    } catch (err) {
      console.warn("⚠️ Erro ao excluir foto do Supabase:", err?.message);
    }
  }

  // 2 — deletar GPX
  if (trail.gpxUrl) {
    const gpxPath = extractPathFromUrl(trail.gpxUrl, BUCKET);

    if (gpxPath) {
      try {
        await deleteFromSupabase(gpxPath);
      } catch (err) {
        console.warn("⚠️ Erro ao excluir GPX do Supabase:", err?.message);
      }
    }
  }

  // 3 — deletar fotos do banco
  await prisma.photo.deleteMany({
    where: { trailId: trail.id },
  });

  // 4 — deletar trilha
  await prisma.trail.delete({
    where: { id: trail.id },
  });

  return true;
}
