import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", UserController.login);
router.post("/", UserController.create);

router.get("/", authMiddleware, UserController.getAll);
router.get("/:id", authMiddleware, UserController.getById);
router.put("/:id", authMiddleware, UserController.update);
router.delete("/:id", authMiddleware, UserController.delete);

export default router;