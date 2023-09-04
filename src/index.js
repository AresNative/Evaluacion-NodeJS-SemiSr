import express from "express";
import jsonwebtoken from "jsonwebtoken";
import connectDB from "./services/db.js";
// Rutas
import usersRouter from "./routes/users.js";
import rolesRouter from "./routes/roles.js";
import moviesRouter from "./routes/movies.js";
connectDB();
const app = express();

// Configurar middlewares
app.use(express.json());

// Configura la clave secreta para JWT
const secretKey = "tu_clave_secreta";

// Middleware de autenticación JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido" });
  }
};

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/movies", authenticateJWT, moviesRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Algo salió mal" });
});

// Iniciar el servidor
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
