import { postJSON } from './api';

// Cadastrar usuário
export async function registerUser(userData) {
  return postJSON('/auth/register', userData);
}

//Login
export async function login(userData) {
  return postJSON('/auth/login', userData);
}

//  Atualizar usuário
export async function updateUser(userData) {
  return postJSON('/auth/update', userData);
}