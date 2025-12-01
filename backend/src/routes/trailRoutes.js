import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as trailController from "../controllers/trailController.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

// Garante que o diretório 'uploads/' existe no Render
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Mantém o nome aleatório do Multer, mas adiciona a extensão original
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Extrai a extensão do nome original do arquivo
    const extension = file.originalname.split(".").pop();
    // Nome do arquivo com extensão: ex: 1732551484-91234.gpx
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

router.get("/", authMiddleware, trailController.listTrails);
router.delete("/:id", authMiddleware, trailController.deleteTrail);

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "gpx", maxCount: 1 },
  ]),
  trailController.createTrailFull
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "gpx", maxCount: 1 },
  ]),
  trailController.updateTrailFull
);

export default router;
