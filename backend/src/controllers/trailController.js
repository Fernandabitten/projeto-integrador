import { sendSuccess, sendError } from "../utils/httpResponses.js";
import { createTrailCore } from "../core/createTrailCore.js";
import { updateTrailCore } from "../core/updateTrailCore.js";

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

// ------------------------------
// Controllers
// ------------------------------

export const listTrails = (req, res) => {
  const { page, limit } = req.query;

  if (page && isNaN(page)) {
    return sendError(res, 400, "Parâmetro 'page' inválido.");
  }
  if (limit && isNaN(limit)) {
    return sendError(res, 400, "Parâmetro 'limit' inválido.");
  }

  return sendSuccess(res, 200, trails);
};

export function createTrail(req, res) {
  try {
    const newTrail = createTrailCore(trails, req.body);

    return sendSuccess(res, 201, newTrail);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

export function updateTrail(req, res) {
  const { id } = req.params;

  try {
    const updated = updateTrailCore(trails, id, req.body);
    return sendSuccess(res, 200, updated);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
}

export const deleteTrail = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const index = trails.findIndex((t) => t.id === id);

  if (index === -1) {
    return sendError(res, 404, "Trilha não encontrada.");
  }

  const trail = trails[index];

  if (!userId) {
    return sendError(res, 401, "Usuário não autenticado.");
  }

  if (trail.userId != userId) {
    return sendError(res, 403, "Você não pode excluir esta trilha.");
  }

  trails.splice(index, 1);

  return sendSuccess(res, 200, null, "Trilha deletada com sucesso.");
};
