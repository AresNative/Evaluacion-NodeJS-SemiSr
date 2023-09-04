import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // Agrega otras propiedades de película según tus requerimientos
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
