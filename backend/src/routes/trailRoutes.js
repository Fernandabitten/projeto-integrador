import { Router } from "express";
import * as trailController from "../controllers/trailController.js";

const router = Router();

// Rota GET /trails → chama listTrails
router.get("/", trailController.listTrails);

// Rota POST /trails
router.post("/", trailController.createTrail);

// Rota PUT /trails/:id
router.put("/:id", trailController.updateTrail);

// Rota DELETE /trails/:id
router.delete("/:id", trailController.deleteTrail);

export default router;
