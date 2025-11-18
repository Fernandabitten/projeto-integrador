import { getJSON, postJSON, putJSON, deleteJSON } from './api';

// Buscar trilhas
export async function fetchTrails() {
  return getJSON('/trails');
}

// Criar trilha
export async function createTrail(trailData) {
  return postJSON('/trails', trailData);
}

// Editar trilha
export function updateTrail(id, data) {
  return putJSON(`/trails/${id}`, data);
}

// Excluir trilha
export function deleteTrail(id) {
  return deleteJSON(`/trails/${id}`);
}
