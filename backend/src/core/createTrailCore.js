export function createTrailCore(trails, data) {
  const { name, state, city, description, difficulty, distance, userId } = data;

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (
    !name ||
    !state ||
    !city ||
    !description ||
    !difficulty ||
    distance === undefined ||
    distance === null
  ) {
    throw new Error("Dados obrigatórios ausentes.");
  }

  const newTrail = {
    id: "t-" + Date.now(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  trails.push(newTrail);
  return newTrail;
}