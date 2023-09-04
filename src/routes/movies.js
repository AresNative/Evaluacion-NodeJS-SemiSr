import express from "express";
const router = express.Router();

// Importa el controlador de películas
import * as MovieController from "../controllers/movieController.js";

// Rutas para películas
router.post("/", MovieController.createMovie);
router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovieById);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);
router.get("/search/:nombre", MovieController.searchMovieByName);

export default router;
