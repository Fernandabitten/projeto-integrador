import { prisma } from "../lib/prisma.js";
import { comparePassword } from "../utils/auth.js";

export async function loginUserCore({ email, password }) {
  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Senha incorreta.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
