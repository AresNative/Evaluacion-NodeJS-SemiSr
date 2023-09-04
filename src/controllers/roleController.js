import Role from "../models/role.js"; // Importa el modelo de rol
import express from "express";

const router = express.Router();

// Crear un nuevo rol
export const createRole = async (req, res) => {
  try {
    const newRole = new Role({
      name: req.body.name,
      // Agrega otras propiedades de rol según tus requerimientos
    });

    const savedRole = await newRole.save();
    res.status(201).json({ message: "Rol creado con éxito", role: savedRole });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el rol", error: error });
  }
};

// Obtener información de un rol por ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener información del rol", error: error });
  }
};

// Actualizar información de un rol
export const updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Rol actualizado con éxito", role: updatedRole });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el rol", error: error });
  }
};

// Eliminar un rol
export const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndRemove(req.params.id);

    if (!deletedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.status(200).json({ message: "Rol eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el rol", error: error });
  }
};

export default router;
