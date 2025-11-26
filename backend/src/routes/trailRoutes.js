import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as trailController from "../controllers/trailController.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" }); // diretório temporário

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
