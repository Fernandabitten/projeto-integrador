import { createClient } from "@supabase/supabase-js";
import path from "path";
import fs from "fs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET;
const PHOTOS_FOLDER = process.env.SUPABASE_PHOTOS_FOLDER || "photos";
const FILES_FOLDER = process.env.SUPABASE_FILES_FOLDER || "gpx";

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET) {
  throw new Error(
    "Supabase is not configured (SUPABASE_URL / SUPABASE_KEY / SUPABASE_BUCKET)."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function cryptoSafeId() {
  if (typeof globalThis?.crypto?.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

async function uploadStreamToSupabase(
  destPath,
  filePath,
  mimetype,
  upsert = false
) {
  const fileStream = fs.createReadStream(filePath);

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(destPath, fileStream, {
      cacheControl: "3600",
      upsert,
      contentType: mimetype,
    });

  // remove temporário
  try {
    fs.unlinkSync(filePath);
  } catch (e) {}

  if (error) throw error;

  const { data: publicData, error: urlErr } = await supabase.storage
    .from(BUCKET)
    .getPublicUrl(destPath);

  if (urlErr) throw urlErr;

  const publicURL = publicData.publicUrl;
  if (!publicURL) {
    throw new Error("Falha ao obter URL pública após upload.");
  }

  return { url: publicURL, path: destPath };
}

export async function uploadPhotoStream(trailId, file) {
  const ext = path.extname(file.originalname);
  const uniqueName = `${trailId}/${Date.now()}-${cryptoSafeId()}${ext}`;
  const destPath = `${PHOTOS_FOLDER}/${uniqueName}`;
  return uploadStreamToSupabase(destPath, file.path, file.mimetype, false);
}

export async function uploadFileStream(trailId, file) {
  const ext = path.extname(file.originalname);
  const uniqueName = `${trailId}/${Date.now()}-${cryptoSafeId()}${ext}`;
  const destPath = `${FILES_FOLDER}/${uniqueName}`;
  return uploadStreamToSupabase(destPath, file.path, file.mimetype, true);
}

export async function deleteFromSupabase(filePath) {
  if (!filePath) return;

  try {
    // Exemplo: "photos/9/arquivo.jpg" ou "gpx/9/rota-123.gpx"
    const { data, error } = await supabase.storage
      .from(BUCKET) // → uploads (no seu caso)
      .remove([filePath]); // aceita array de caminhos

    if (error) {
      console.error("[ERRO] ao excluir do Supabase:", error);
      throw error;
    }

    console.log("[Supabase] Arquivo removido:", filePath);
    return true;
  } catch (err) {
    console.error("[deleteFromSupabase] Falha:", err);
    return false;
  }
}
