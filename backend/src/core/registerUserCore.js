export function registerUserCore(users, { name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    throw new Error("E-mail já está em uso.");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  // retorna apenas os dados públicos
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}
