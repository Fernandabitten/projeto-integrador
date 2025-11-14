export async function getStates() {
  const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  if (!res.ok) throw new Error('Erro ao buscar estados');
  const data = await res.json();
  return data.sort((a, b) => a.nome.localeCompare(b.nome));
}

export async function getCitiesByState(uf) {
  if (!uf) return [];

  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );
  if (!res.ok) throw new Error('Erro ao buscar cidades');
  const data = await res.json();

  return data.map(c => c.nome).sort((a, b) => a.localeCompare(b));
}
