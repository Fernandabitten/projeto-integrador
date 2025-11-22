import { comparePassword } from "../utils/auth.js";

export async function loginUserCore(users, data) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return {
      status: 401,
      message: "Senha incorreta.",
    };
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
