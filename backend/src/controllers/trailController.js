const { sendSuccess, sendError } = require("../utils/httpResponses");
// Simulação de dados de trilhas (Trail) com base no diagrama de classes

const trails = [
  {
    id: "t1-uuid-051",
    name: "Trilha da Pedra da Rajada",
    state: "São Paulo",
    city: "Campinas",
    description:
      "Trilha com vista panorâmica, ideal para quem busca aventura e belas paisagens.",
    difficulty: "Moderado",
    distance: 4.5,
    filePath: "/uploads/gpx/pedra-rajada.gpx",
    createdAt: new Date("2025-04-01T08:00:00Z"),
    updatedAt: new Date("2025-04-10T09:30:00Z"),
    userId: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    photos: [
      {
        id: "p1-uuid-001",
        url: "https://picsum.photos/seed/rajada1/400/300",
        path: "/uploads/photos/rajada1.jpg",
        trailId: "t1-uuid-001",
        createdAt: new Date("2025-04-01T08:30:00Z"),
      },
      {
        id: "p1-uuid-002",
        url: "https://picsum.photos/seed/rajada2/400/300",
        path: "/uploads/photos/rajada2.jpg",
        trailId: "t1-uuid-001",
        createdAt: new Date("2025-04-01T08:45:00Z"),
      },
    ],
    file: {
      id: "f1-uuid-001",
      path: "/uploads/files/rajada-mapa.gpx",
      type: "application/gpx+xml",
      url: "https://meuapp.com/files/rajada-mapa.gpx",
      trailId: "t1-uuid-001",
      createdAt: new Date("2025-04-01T09:00:00Z"),
    },
  },
  {
    id: "t1-uuid-001",
    name: "Trilha da Pedra da Rajada",
    state: "Ceará",
    city: "Maranguape",
    description:
      "Trilha com vista panorâmica, ideal para quem busca aventura e belas paisagens.",
    difficulty: "Moderado",
    distance: 4.5,
    filePath: "/uploads/gpx/pedra-rajada.gpx",
    createdAt: new Date("2025-04-01T08:00:00Z"),
    updatedAt: new Date("2025-04-10T09:30:00Z"),
    userId: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    photos: [
      {
        id: "p1-uuid-001",
        url: "https://picsum.photos/seed/rajada1/400/300",
        path: "/uploads/photos/rajada1.jpg",
        trailId: "t1-uuid-001",
        createdAt: new Date("2025-04-01T08:30:00Z"),
      },
      {
        id: "p1-uuid-002",
        url: "https://picsum.photos/seed/rajada2/400/300",
        path: "/uploads/photos/rajada2.jpg",
        trailId: "t1-uuid-001",
        createdAt: new Date("2025-04-01T08:45:00Z"),
      },
    ],
    file: {
      id: "f1-uuid-001",
      path: "/uploads/files/rajada-mapa.gpx",
      type: "application/gpx+xml",
      url: "https://meuapp.com/files/rajada-mapa.gpx",
      trailId: "t1-uuid-001",
      createdAt: new Date("2025-04-01T09:00:00Z"),
    },
  },
  {
    id: "t2-uuid-001",
    name: "Trilha do Parque do Cocó",
    state: "Ceará",
    city: "Fortaleza",
    description:
      "Trilha urbana leve com vegetação nativa e acesso facilitado, ideal para iniciantes.",
    difficulty: "Fácil",
    distance: 8.0,
    filePath: "/uploads/gpx/coco-trilha.gpx",
    createdAt: new Date("2025-04-05T10:00:00Z"),
    updatedAt: new Date("2025-04-08T12:00:00Z"),
    userId: "b2c3d4e5-f6a7-8901-bc23-de45fg67hi89",
    photos: [
      {
        id: "p2-uuid-001",
        url: "https://picsum.photos/seed/coco1/400/300",
        path: "/uploads/photos/coco1.jpg",
        trailId: "t2-uuid-001",
        createdAt: new Date("2025-04-05T10:30:00Z"),
      },
    ],
    file: {
      id: "f2-uuid-001",
      path: "/uploads/files/coco-trilha.gpx",
      type: "application/gpx+xml",
      url: "https://meuapp.com/files/coco-trilha.gpx",
      trailId: "t2-uuid-001",
      createdAt: new Date("2025-04-05T10:35:00Z"),
    },
  },
  {
    id: "t3-uuid-001",
    name: "Trilha da Esperança",
    state: "Ceará",
    city: "Guaramiranga",
    description:
      "Trilha desafiadora com subidas intensas e mirantes incríveis, ideal para praticantes experientes.",
    difficulty: "Difícil",
    distance: 5.0,
    filePath: "/uploads/gpx/esperanca-trilha.gpx",
    createdAt: new Date("2025-05-02T08:00:00Z"),
    updatedAt: new Date("2025-05-05T10:15:00Z"),
    userId: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    photos: [
      {
        id: "p3-uuid-001",
        url: "https://picsum.photos/seed/esperanca1/400/300",
        path: "/uploads/photos/esperanca1.jpg",
        trailId: "t3-uuid-001",
        createdAt: new Date("2025-05-02T08:15:00Z"),
      },
      {
        id: "p3-uuid-002",
        url: "https://picsum.photos/seed/esperanca2/400/300",
        path: "/uploads/photos/esperanca2.jpg",
        trailId: "t3-uuid-001",
        createdAt: new Date("2025-05-02T08:20:00Z"),
      },
    ],
    file: {
      id: "f3-uuid-001",
      path: "/uploads/files/esperanca-trilha.gpx",
      type: "application/gpx+xml",
      url: "https://meuapp.com/files/esperanca-trilha.gpx",
      trailId: "t3-uuid-001",
      createdAt: new Date("2025-05-02T09:00:00Z"),
    },
  },
];

// Listar trilhas!
exports.listTrails = (req, res) => {
  const { page, limit } = req.query;

  // Validação opcional de paginação
  if (page && isNaN(page)) {
    return sendError(res, 400, "Parâmetro 'page' inválido.");
  }
  if (limit && isNaN(limit)) {
    return sendError(res, 400, "Parâmetro 'limit' inválido.");
  }

  return sendSuccess(res, 200, trails);
};

// Adicionar trilha
exports.createTrail = (req, res) => {
  const { name, state, city, description, difficulty, distance, userId } =
    req.body;

  // 400 → validação simples
  if (!name || !state || !city || !description || !difficulty || !distance) {
    return sendError(res, 400, "Dados obrigatórios ausentes.");
  }

  // 401 → Simulação de autenticação
  if (!userId) {
    return sendError(res, 401, "Usuário não autenticado.");
  }

  const newTrail = {
    id: "t-" + Date.now(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  trails.push(newTrail);

  return sendSuccess(res, 201, newTrail);
};
