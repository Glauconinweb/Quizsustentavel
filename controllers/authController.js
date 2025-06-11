const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email já está em uso." });

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        name: nome,
        email,
        password: hashedPassword,
        telephone: telefone,
      },
    });

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor." });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ error: "Email ou senha inválidos." });

    const isPasswordValid = await bcrypt.compare(senha, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Email ou senha inválidos." });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Você pode enviar o token e também alguns dados do usuário se quiser
    res.json({
      message: "Login realizado com sucesso!",
      token,
      usuario: { id: user.id, nome: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor." });
  }
};

module.exports = { register, login };
