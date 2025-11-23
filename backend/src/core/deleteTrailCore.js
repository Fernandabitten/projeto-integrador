export function deleteTrailCore(trails, id, userId) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const index = trails.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error("Trilha não encontrada.");
  }

  const trail = trails[index];

  if (trail.userId !== userId) {
    throw new Error("Você não tem permissão para excluir esta trilha.");
  }

  // Remove a trilha
  trails.splice(index, 1);

  return {
    message: "Trilha excluída com sucesso.",
  };
}
