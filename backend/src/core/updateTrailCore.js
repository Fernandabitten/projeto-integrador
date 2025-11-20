export function updateTrailCore(trails, id, data) {
  const { userId } = data;

  const trail = trails.find((t) => t.id === id);

  if (!trail) {
    throw new Error("Trilha não encontrada.");
  }

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  if (trail.userId !== userId) {
    throw new Error("Você não tem permissão para editar esta trilha.");
  }

  // Atualiza somente campos permitidos
  Object.assign(trail, data, { updatedAt: new Date() });

  return trail;
}