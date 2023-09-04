import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Importa el modelo de usuario

// Registro de un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encripta la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crea un nuevo usuario
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      // Agrega lógica para asignar un rol al usuario según tus requerimientos
    });

    // Guarda el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: error });
  }
};

// Inicio de sesión de usuario
export const loginUser = async (req, res) => {
  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Compara la contraseña ingresada con la contraseña almacenada
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crea y firma un token JWT
    const token = jwt.sign({ _id: user._id }, "tu_clave_secreta"); // Reemplaza con tu clave secreta

    res.status(200).json({ message: "Inicio de sesión exitoso", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error });
  }
};

// Obtener información de un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener información del usuario",
      error: error,
    });
  }
};

// Actualizar información de un usuario
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Usuario actualizado con éxito", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error: error });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error });
  }
};
