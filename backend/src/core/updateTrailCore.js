export function updateTrailCore(trails, id, data) {
  const trail = trails.find((t) => t.id === id);

  if (!trail) {
    throw new Error("Trilha não encontrada.");
  }

  if (!data.userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (trail.userId !== data.userId) {
    throw new Error("Você não tem permissão para editar esta trilha.");
  }

  const updatedTrail = {
    ...trail,
    ...data,
    updatedAt: new Date(),
  };

  return updatedTrail;
};
