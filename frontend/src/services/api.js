const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(url, options = {}) {
  try {
    const token = localStorage.getItem('token');

    // Não forçar Content-Type quando body for FormData
    const headers = { ...(options.headers || {}) };
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }
    if (token) headers.Authorization = 'Bearer ' + token;

    const res = await fetch(`${API}${url}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errorMessage = `Erro ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // Ignorar erro ao tentar fazer parse do JSON de erro
      }
      if (res.status === 401) {
        console.warn('⚠️ Sessão expirada ou login inválido.');
      }
      throw new Error(errorMessage);
    }

    return res.json();
  } catch (err) {
    console.error('Erro na requisição:', err.message);
    throw err;
  }
}

export async function postJSON(url, body) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function postForm(url, formData) {
  return request(url, {
    method: 'POST',
    body: formData, // headers deliberately left to fetch
  });
}

export async function getJSON(url) {
  return request(url);
}

export async function putJSON(url, body) {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function putForm(url, formData) {
  return request(url, {
    method: 'PUT',
    body: formData,
  });
}

export async function deleteJSON(url, userId) {
  return request(url, {
    method: 'DELETE',
    headers: { 'x-user-id': userId },
  });
}
