import { sendSuccess, sendError } from "../utils/httpResponses.js";

// "Banco de dados" em memória
const users = [];

// ===========================
//   POST /auth/register
// ===========================
export function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendError(res, 400, "Todos os campos são obrigatórios.");
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return sendError(res, 409, "E-mail já está em uso.");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  return sendSuccess(res, 201, {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  });
}

// ===========================
//      POST /auth/login
// ===========================
export function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, "E-mail e senha são obrigatórios.");
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return sendError(res, 404, "Usuário não encontrado.");
  }

  if (user.password !== password) {
    return sendError(res, 401, "Senha incorreta.");
  }

  return sendSuccess(res, 200, {
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
