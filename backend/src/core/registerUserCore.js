import { prisma } from "../lib/prisma.js";
import { hashPassword, generateToken } from "../utils/auth.js";

export async function registerUserCore({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("E-mail já está em uso.");
  }

  const hashed = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  const token = generateToken({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  });

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
}
