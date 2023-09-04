import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role", // Referencia al modelo de roles
  },
  // Agrega otras propiedades de usuario según tus requerimientos
});

// Cambia "User" a "Usuario" para mantener consistencia con el modelo
const Usuario = mongoose.model("Usuario", userSchema);

export default Usuario;
