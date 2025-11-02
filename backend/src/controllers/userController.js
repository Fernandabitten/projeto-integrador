// Simulação de "banco de dados" em memória
const users = [];

exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Validação básica
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
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