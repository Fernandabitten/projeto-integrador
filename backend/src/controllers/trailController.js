// Simulação de dados
const trilhas = [
  { id: 1, nome: "Pedra da Rajada", local: "Maranguape - CE", dificuldade: "Moderado", distanciaKm: 8.0 },
  { id: 2, nome: "Trilha do Parque do Cocó", local: "Fortaleza - CE",  dificuldade: "Fácil", distanciaKm: 3.0 },
  { id: 3, nome: "Trilha da Esperança", local: "Guaramiranga - CE" ,dificuldade: "Difícil", distanciaKm: 15.0 }
];

// Função para listar todas as trilhas
exports.listarTrilhas = (req, res) => {
  res.json(trilhas);
};