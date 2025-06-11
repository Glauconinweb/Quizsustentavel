require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(cors()); // Libera CORS para seu frontend
app.use(express.json()); // Para receber JSON no body

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
