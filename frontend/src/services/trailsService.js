import { getJSON, postJSON } from './api';

// Buscar trilhas
export async function fetchTrails() {
  return getJSON('/trails');
}

// Criar nova trilha
export async function createTrail(trailData) {
  return postJSON('/trails', trailData);
}
