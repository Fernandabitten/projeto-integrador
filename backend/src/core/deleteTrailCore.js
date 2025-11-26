// core/deleteTrailCore.js

export function deleteTrailCore(trails, trailId, userId) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const index = trails.findIndex((t) => t.id === trailId);

  if (index === -1) {
    throw new Error("Trilha não encontrada.");
  }

  const trail = trails[index];

  if (trail.userId !== userId) {
    throw new Error("Você não pode excluir esta trilha.");
  }

  // Remover trilha
  trails.splice(index, 1);

  return true; // Apenas para indicar sucesso
}
