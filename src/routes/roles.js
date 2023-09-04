import express from "express";
const router = express.Router();

// Importa el controlador de roles
import * as RoleController from "../controllers/roleController.js";

// Rutas para roles
router.post("/", RoleController.createRole);
router.get("/:id", RoleController.getRoleById);
router.put("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

export default router;
