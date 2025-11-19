import { Router } from "express";
import * as trailController from "../controllers/trailController.js";

const router = Router();

// Rota GET /trails → chama a função listTrails do controller
router.get("/", trailController.listTrails);

router.post("/", trailController.createTrail);

router.put("/:id", trailController.updateTrail);

router.delete("/:id", trailController.deleteTrail);

export default router;
