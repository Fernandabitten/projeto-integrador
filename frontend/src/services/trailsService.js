import { getJSON, postJSON, putJSON, deleteJSON, postForm, putForm } from './api';

// Buscar trilhas
export function fetchTrails() {
  return getJSON('/trails');
}

// Criar trilha (quando body for FormData, passamos flag)
export async function createTrail(trailData, isForm = false) {
  if (isForm) {
    return postForm('/trails', trailData);
  } else {
    return postJSON('/trails', trailData);
  }
}

// Editar trilha
export function updateTrail(id, data, isForm = false) {
  if (isForm) return putForm(`/trails/${id}`, data);
  return putJSON(`/trails/${id}`, data);
}

// Excluir trilha
export function deleteTrail(id, userId) {
  return deleteJSON(`/trails/${id}`, userId);
}
