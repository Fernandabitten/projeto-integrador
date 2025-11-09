// Simulação de "banco de dados" em memória
const users = [];

// Cadastro
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Validação básica
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  // Verificar se o e-mail já foi cadastrado
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "E-mail já cadastrado." });
  }

  // Criar novo usuário
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  return res.status(201).json({
    message: "Usuário cadastrado com sucesso!",
    user: newUser,
  });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "Usuário não encontrado." });

  // Comparação simples de senha
  if (user.password !== password) {
    return res.status(401).json({ message: "Senha incorreta." });
  }

  res.json({
    message: "Login bem-sucedido!",
    user: { id: user.id, name: user.name, email: user.email },
  });
};
