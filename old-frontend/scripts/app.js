import * as api from './api.js';
import { renderLista, renderSelector } from './ui.js';

let trilhas = [];

async function init() {
  try {
    trilhas = await api.getTrilhas();

    // Renderiza os filtros e passa o callback de filtragem
    renderSelector(trilhas, aplicarFiltros);

    // Renderiza a lista inicial
    renderLista(trilhas);
  } catch (erro) {
    console.error('Erro ao carregar trilhas:', erro);
  }
}

/**
 * Aplica os filtros selecionados na UI
 */
function aplicarFiltros(filtros) {
  const { estado, cidade, dificuldade } = filtros;

  const filtradas = trilhas.filter(t => {
    const estadoOk = estado === 'todas' || t.local.includes(estado);
    const cidadeOk = cidade === 'todas' || t.local.includes(cidade);
    const dificuldadeOk = dificuldade === 'todas' || t.dificuldade === dificuldade;
    return estadoOk && cidadeOk && dificuldadeOk;
  });

  renderLista(filtradas);
}

init();
