import express from "express";

// Importar todas as Rotas


import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/users", authMiddleware, userRoutes);
router.use("/obras", obraRoutes);

export default router;