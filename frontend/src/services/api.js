const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Função auxiliar genérica para lidar com requisições e erros
 */
async function request(url, options = {}) {
  try {
    const res = await fetch(`${API}${url}`, options);

    // Intercepta erros HTTP (como 401, 404, 500)
    if (!res.ok) {
      let errorMessage = `Erro ${res.status}`;

      try {
        // Tenta ler a mensagem JSON vinda do backend
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Caso o backend não mande JSON
        errorMessage = res.statusText || errorMessage;
      }

      // Caso o status seja 401 → sessão expirada / não autorizado
      if (res.status === 401) {
        console.warn('⚠️ Sessão expirada ou login inválido.');
        // TODO:
        // - Redirecionar para /login
        // - Apagar o token salvo no localStorage
      }
      // Lança sempre um Error com a mensagem correta
      throw new Error(errorMessage);
    }

    // Se tudo deu certo, retorna o JSON
    return res.json();
  } catch (err) {
    console.error('Erro na requisição:', err.message);
    throw err; // repassa o erro para o App.jsx
  }
}

/**
 * POST JSON — envia dados no corpo da requisição
 */
export async function postJSON(url, body, token) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: JSON.stringify(body),
  });
}

/**
 * GET JSON — busca dados da API
 */
export async function getJSON(url, token) {
  return request(url, {
    headers: {
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
  });
}

/**
 * PUT JSON — atualiza um registro
 */
export async function putJSON(url, body, token) {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: JSON.stringify(body),
  });
}

/**
 * DELETE JSON — remove um registro
 */
export async function deleteJSON(url, userId, token) {
  return request(url, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      'x-user-id': userId,
    },
  });
}
