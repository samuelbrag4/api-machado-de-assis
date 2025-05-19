import { Router } from "express";
import ObraController from "../controllers/obra.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, ObraController.getAll);
router.get("/:id", authMiddleware, ObraController.getById);
router.post("/", authMiddleware, ObraController.create);
router.put("/:id", authMiddleware, ObraController.update);
router.delete("/:id", authMiddleware, ObraController.delete);

export default router;