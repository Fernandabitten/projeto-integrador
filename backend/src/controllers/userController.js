import { sendSuccess, sendError } from "../utils/httpResponses.js";
import { registerUserCore } from "../core/registerUserCore.js";
import { loginUserCore } from "../core/loginUserCore.js";
import { generateToken } from "../utils/auth.js";


// "Banco de dados" em memória
const users = [];

// ===========================
//   POST /auth/register
// ===========================
export async function registerUser(req, res) {
  try {
    const result = await registerUserCore(users, req.body);
    return sendSuccess(res, 201, result);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

// ===========================
//      POST /auth/login
// ===========================
export async function loginUser(req, res) {
  try {
    const user = await loginUserCore(users, req.body);
    // gera token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return sendSuccess(res, 200, {
      user,
      token,
    });
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

// ===========================
//      PUT /auth/update
// ===========================
export async function updateUser(req, res) {
  try {
    const { id, name, email } = req.body;

    // Verificação básica
    if (!id) {
      return sendError(res, 400, "ID do usuário é obrigatório.");
    }

    // Buscar usuário
    const user = users.find((u) => u.id === id);

    if (!user) {
      return sendError(res, 404, "Usuário não encontrado.");
    }

    // Atualizar apenas campos enviados
    if (name) user.name = name;
    if (email) user.email = email;

    if (data.password) {
  user.password = await bcrypt.hash(data.password, 10);
    }

    return sendSuccess(res, 200, {
      message: "Usuário atualizado com sucesso!",
      user,
    });

  } catch (err) {
    return sendError(res, 500, "Erro ao atualizar usuário.");
  }
}