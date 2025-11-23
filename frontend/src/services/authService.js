import { postJSON } from './api';
// Cadastrar usuário
export async function registerUser(userData) {
  return postJSON('/auth/register', userData);
}

//Login
export async function login(userData) {
  return postJSON('/auth/login', userData);
}

//Atualizar Usuário 
export async function updateUser(data) {
  const response = await fetch("http://localhost:3000/auth/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}