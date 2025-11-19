export function createTrailCore(trails, data) {
  const { name, state, city, description, difficulty, distance, userId } = data;

  if (!name || !state || !city || !description || !difficulty || !distance) {
    throw new Error("Dados obrigatórios ausentes.");
  }

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const newTrail = {
    id: "t-" + Date.now(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newTrail;
};
