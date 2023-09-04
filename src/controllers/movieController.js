import Movie from "../models/movie.js"; // Importa el modelo de película
import express from "express";

// Crear una nueva película
export const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      // Agrega otras propiedades de película según tus requerimientos
    });

    const savedMovie = await newMovie.save();
    res
      .status(201)
      .json({ message: "Película creada con éxito", movie: savedMovie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la película", error: error });
  }
};

// Obtener todas las películas
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las películas", error: error });
  }
};

// Obtener información de una película por ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener información de la película",
      error: error,
    });
  }
};

// Actualizar información de una película
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Película actualizada con éxito", movie: updatedMovie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la película", error: error });
  }
};

// Eliminar una película
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.status(200).json({ message: "Película eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la película", error: error });
  }
};

// Buscar películas por nombre
export const searchMovieByName = async (req, res) => {
  try {
    const query = req.params.nombre;
    const movies = await Movie.find({
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar películas", error: error });
  }
};
