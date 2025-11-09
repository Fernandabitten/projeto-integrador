//Comunicação com o backend

const BASE_URL = "http://localhost:3000";

export async function getTrilhas() {
  const resposta = await fetch(`${BASE_URL}/trails`);
  if (!resposta.ok) throw new Error("Erro ao buscar trilhas");
  return resposta.json();
}

export async function criarTrilha(trilha) {
  const resposta = await fetch(`${BASE_URL}/trails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trilha),
  });
  if (!resposta.ok) throw new Error("Erro ao criar trilha");
  return resposta.json();
}

export async function deletarTrilha(id) {
  const resposta = await fetch(`${BASE_URL}/trails/${id}`, {
    method: "DELETE",
  });
  if (!resposta.ok) throw new Error("Erro ao excluir trilha");
}
