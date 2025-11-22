import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as trailController from "../controllers/trailController.js";

const router = Router();

// Rota GET /trails → chama listTrails
router.get("/", authMiddleware, trailController.listTrails);

// Rota POST /trails
router.post("/", authMiddleware, trailController.createTrail);

// Rota PUT /trails/:id
router.put("/:id", authMiddleware, trailController.updateTrail);

// Rota DELETE /trails/:id
router.delete("/:id", authMiddleware, trailController.deleteTrail);

export default router;
