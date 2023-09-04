import express from "express";
const router = express.Router();

// Importa el controlador de usuarios sin 'default'
import * as UserController from "../controllers/userController.js";

// Rutas para usuarios
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router; // Exporta el enrutador
