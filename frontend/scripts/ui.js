export function renderLista(trilhas) {
  const container = document.getElementById('trail-grid');
  container.innerHTML = '';

  if (!trilhas.length) {
    container.innerHTML = `<p class="no-results">Nenhuma trilha encontrada 😢</p>`;
    return;
  }

  for (const trilha of trilhas) {
    const card = document.createElement('article');

    card.classList.add('trail-card');
    card.innerHTML = `
      <img
        src="https://placehold.co/400x250/2d5437/ffffff?text=${trilha.nome}"
        onerror="this.onerror=null; this.src='https://placehold.co/400x250/e0e0e0/333333?text=Imagem+Nao+Disponivel';"
        alt="${trilha.nome}, ${trilha.local}"
        class="trail-image"
      />
      <div class="trail-content">
        <h3 class="trail-title">${trilha.nome}</h3>

        <p class="trail-info">
          <i class="fa-solid fa-map-pin icon text-primary-light"></i>
          <span>${trilha.local}</span>
        </p>

        <p class="trail-details">
          <i class="fa-solid fa-mountain icon text-orange"></i>
          <span class="detail-text">${trilha.dificuldade}</span>
          <i class="fa-solid fa-location-arrow icon text-blue"></i>
          <span>${trilha.distanciaKm} Km</span>
        </p>

        <a href="#" class="card-button">Ver Detalhes</a>
      </div>
    `;
    container.appendChild(card);
  }
}

/**
 * Renderiza os selects de filtro e registra os eventos
 */
export function renderSelector(trilhas, onFilterChange) {
  const container = document.getElementById('filter-section');
  container.innerHTML = '';

  // Extrair estados e cidades únicas
  const estados = [...new Set(trilhas.map(t => t.local.split('-').pop().trim()))];
  const cidades = [...new Set(trilhas.map(t => t.local.split('-')[0].trim()))];

  const filter = document.createElement('div');
  filter.innerHTML = `
    <fieldset class="filter-grid">
      <div class="filter-item">
        <label for="estado" class="filter-label">Estado:</label>
        <select id="estado" class="filter-select">
          <option value="todas" selected>Todos os estados</option>
          ${estados.map(uf => `<option value="${uf}">${uf}</option>`).join('')}
        </select>
      </div>

      <div class="filter-item">
        <label for="cidade" class="filter-label">Cidade:</label>
        <select id="cidade" class="filter-select">
          <option value="todas" selected>Todas as cidades</option>
          ${cidades.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>

      <div class="filter-item">
        <label for="dificuldade" class="filter-label">Dificuldade:</label>
        <select id="dificuldade" class="filter-select">
          <option value="todas" selected>Todas</option>
          <option value="Fácil">Fácil</option>
          <option value="Moderado">Moderado</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>
    </fieldset>
  `;

  container.appendChild(filter);

  const estadoSelect = container.querySelector('#estado');
  const cidadeSelect = container.querySelector('#cidade');
  const dificuldadeSelect = container.querySelector('#dificuldade');

  // Atualiza cidades quando o estado muda
  estadoSelect.addEventListener('change', () => {
    const estadoSelecionado = estadoSelect.value;
    cidadeSelect.innerHTML = '<option value="todas" selected>Todas as cidades</option>';

    const cidadesFiltradas =
      estadoSelecionado === 'todas'
        ? [...new Set(trilhas.map(t => t.local.split('-')[0].trim()))]
        : [...new Set(
            trilhas
              .filter(t => t.local.includes(estadoSelecionado))
              .map(t => t.local.split('-')[0].trim())
          )];

    cidadesFiltradas.forEach(cidade => {
      const option = document.createElement('option');
      option.value = cidade;
      option.textContent = cidade;
      cidadeSelect.appendChild(option);
    });

    // Notifica o app
    onFilterChange({
      estado: estadoSelect.value,
      cidade: cidadeSelect.value,
      dificuldade: dificuldadeSelect.value
    });
  });

  // Quando cidade ou dificuldade mudam, também notifica o app
  [cidadeSelect, dificuldadeSelect].forEach(select => {
    select.addEventListener('change', () => {
      onFilterChange({
        estado: estadoSelect.value,
        cidade: cidadeSelect.value,
        dificuldade: dificuldadeSelect.value
      });
    });
  });
}
