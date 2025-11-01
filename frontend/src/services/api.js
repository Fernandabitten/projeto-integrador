const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// const API = 'http://localhost:3000';

/**
 * Função auxiliar genérica para lidar com requisições e erros
 */
async function request(url, options = {}) {
  try {
    const res = await fetch(`${API}${url}`, options);

    // Intercepta erros HTTP (como 401, 404, 500)
    if (!res.ok) {
      // Tenta ler o corpo da resposta (se vier mensagem de erro da API)
      let errorMessage = 'Erro desconhecido';
      try {
        const data = await res.json();
        errorMessage = data.message || data.error || res.statusText;
      } catch {
        errorMessage = res.statusText;
      }

      // Caso o status seja 401 → sessão expirada / não autorizado
      if (res.status === 401) {
        console.warn('⚠️ Sessão expirada. Faça login novamente.');
        // TODO:
        // - Redirecionar para /login
        // - Apagar o token salvo no localStorage
      }

      // Lança erro para ser tratado onde a função for chamada
      throw new Error(`Erro ${res.status}: ${errorMessage}`);
    }

    // Se tudo deu certo, retorna o JSON
    return res.json();
  } catch (err) {
    console.error('Erro na requisição:', err.message);
    throw err; // repassa o erro para o componente que chamou
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
