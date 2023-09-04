import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Agrega otras propiedades de rol según tus requerimientos
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
