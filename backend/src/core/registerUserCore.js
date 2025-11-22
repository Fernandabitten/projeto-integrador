import { hashPassword, generateToken } from "../utils/auth.js";

export async function registerUserCore(users, { name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    throw new Error("E-mail já está em uso.");
  }

  const hashed = await hashPassword(password);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashed,
  };

  users.push(newUser);

  // Gera token
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
