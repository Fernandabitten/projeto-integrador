// Simulação de dados
const trails = [
  { id: 1, name: "Pedra da Rajada", location: "Maranguape - CE", difficulty: "Moderado", distance: 8.0 },
  { id: 2, name: "Trilha do Parque do Cocó", location: "Fortaleza - CE",  difficulty: "Fácil", distance: 3.0 },
  { id: 3, name: "Trilha da Esperança", location: "Guaramiranga - CE" ,difficulty: "Difícil", distance: 15.0 }
];

// Função para listar todas as trails
exports.listartrails = (req, res) => {
  res.json(trails);
};