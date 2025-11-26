import { jest } from "@jest/globals";

// -----------------------------
// Declarar Variáveis para Acesso aos Mocks
// -----------------------------
let prisma;
let uploadPhotoStream, uploadFileStream;

// -----------------------------
// Mock do Prisma
// -----------------------------
jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  prisma: {
    trail: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    photo: {
      createMany: jest.fn(),
    },
  },
}));

// -----------------------------
// Mock do uploadService
// -----------------------------
jest.unstable_mockModule("../src/services/uploadService.js", () => ({
  uploadPhotoStream: jest.fn(),
  uploadFileStream: jest.fn(),
}));

// -----------------------------
// Importação do Módulo Principal
// -----------------------------
const { createTrailFullCore } = await import(
  "../src/core/createTrailFullCore.js"
);

// -----------------------------
// Mock Helper para Requisição
// -----------------------------
const mockReq = ({ params = {}, body = {}, files = {} } = {}) => ({
  params,
  body,
  files,
});

// ===============================================
// INÍCIO DOS TESTES
// ===============================================

describe("createTrailFullCore", () => {
  // Inicialização e atribuição das referências de mock
  beforeEach(async () => {
    jest.clearAllMocks();

    const prismaModule = await import("../src/lib/prisma.js");
    const uploadServiceModule = await import(
      "../src/services/uploadService.js"
    );

    prisma = prismaModule.prisma;
    uploadPhotoStream = uploadServiceModule.uploadPhotoStream;
    uploadFileStream = uploadServiceModule.uploadFileStream;
  });

  // --- Dados de Teste Comuns ---
  const validPayload = {
    name: "trilha da cachoeira",
    state: "SP",
    city: "Brotas",
    description: "Uma trilha linda.",
    difficulty: "Médio",
    distance: 10.5,
    userId: 5,
  };

  const mockCreatedTrail = {
    id: 10,
    userId: 5,
    name: "Trilha Da Cachoeira",
    gpxUrl: null,
  };

  const mockFinalTrail = {
    ...mockCreatedTrail,
    photos: [
      {
        url: "photo_url_1",
      },
    ],
    gpxUrl: "gpx_url_final",
  };

  // -----------------------------------------
  // TESTE 1: Validação e Parsing
  // -----------------------------------------
  describe("1 Parsing e Validação", () => {
    test("deve lançar erro 400 se 'data' estiver ausente no body", async () => {
      const req = mockReq({
        body: {},
      });
      await expect(createTrailFullCore(req)).rejects.toThrow(
        "Campo 'data' obrigatório (JSON string)."
      );
    });

    test("deve lançar erro 400 se 'data' não for JSON válido", async () => {
      const req = mockReq({
        body: {
          data: "texto inválido",
        },
      });
      await expect(createTrailFullCore(req)).rejects.toThrow(
        "Campo 'data' inválido: JSON esperado."
      );
    });

    test.each([
      "name",
      "state",
      "city",
      "description",
      "difficulty",
      "distance",
      "userId",
    ])(
      "deve lançar erro 400 se o campo obrigatório '%s' estiver ausente",
      async (field) => {
        const invalidPayload = { ...validPayload };
        invalidPayload[field] = undefined; // Força campo ausente

        const req = mockReq({
          body: {
            data: JSON.stringify(invalidPayload),
          },
        });

        await expect(createTrailFullCore(req)).rejects.toThrow(
          `Campo obrigatório ausente: ${field}`
        );
      }
    );
  });

  // ---

  // -----------------------------------------
  // TESTE 2: Fluxo Completo de Sucesso
  // -----------------------------------------
  test("deve criar a trilha, fazer upload de fotos e GPX, e retornar o objeto completo", async () => {
    // 1. Mocks de Criação e Retorno
    prisma.trail.create.mockResolvedValue(mockCreatedTrail); // Retorno após a criação
    // Mocks para uploads (URLs reais)
    uploadPhotoStream.mockResolvedValue({
      url: "photo_url_1",
      path: "photo_path_1",
    });
    uploadFileStream.mockResolvedValue({
      url: "gpx_url_final",
      path: "gpx_path_final",
    });
    prisma.photo.createMany.mockResolvedValue({
      count: 1,
    });
    prisma.trail.update.mockResolvedValue({}); // Update do GPX
    prisma.trail.findUnique.mockResolvedValue(mockFinalTrail); // Retorno final

    // 2. Requisição
    const req = mockReq({
      body: {
        data: JSON.stringify(validPayload),
      },
      files: {
        photos: [
          {
            originalname: "photo.jpg",
          },
        ],
        gpx: [
          {
            originalname: "gpx.gpx",
          },
        ],
      },
    });

    // 3. Execução
    const result = await createTrailFullCore(req);

    // 4. Asserções

    // Criação da Trilha
    expect(prisma.trail.create).toHaveBeenCalledWith({
      data: {
        name: "Trilha Da Cachoeira", // Espera TitleCase
        state: "SP",
        city: "Brotas",
        description: "Uma trilha linda.",
        difficulty: "Médio",
        distance: 10.5,
        userId: 5,
      },
    });

    // Upload das Fotos
    expect(uploadPhotoStream).toHaveBeenCalledWith("10", req.files.photos[0]);
    expect(prisma.photo.createMany).toHaveBeenCalledWith({
      data: [
        {
          url: "photo_url_1",
          path: "photo_path_1",
          trailId: 10,
        },
      ],
    });

    // Upload e Update do GPX
    expect(uploadFileStream).toHaveBeenCalledWith("10", req.files.gpx[0]);
    expect(prisma.trail.update).toHaveBeenCalledWith({
      where: {
        id: 10,
      },
      data: {
        gpxUrl: "gpx_url_final",
      },
    });

    // Retorno Final
    expect(prisma.trail.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: 10,
        },
        include: {
          photos: true,
        },
      })
    );
    expect(result).toEqual(mockFinalTrail);
  });

  // ---

  // -----------------------------------------
  // TESTE 3: Sem Fotos e Sem GPX
  // -----------------------------------------
  test("deve criar a trilha e pular uploads se não houver arquivos", async () => {
    // Mocks de Criação e Retorno
    prisma.trail.create.mockResolvedValue(mockCreatedTrail);
    // Simula a trilha final sem GPX ou Fotos
    const finalTrailWithoutFiles = { ...mockCreatedTrail, photos: [] };
    prisma.trail.findUnique.mockResolvedValue(finalTrailWithoutFiles);

    // Requisição sem 'files'
    const req = mockReq({
      body: {
        data: JSON.stringify(validPayload),
      },
      files: {},
    });

    await createTrailFullCore(req);

    // Asserções
    expect(prisma.trail.create).toHaveBeenCalledTimes(1); // Trilha criada
    expect(uploadPhotoStream).not.toHaveBeenCalled();
    expect(prisma.photo.createMany).not.toHaveBeenCalled();
    expect(uploadFileStream).not.toHaveBeenCalled();
    expect(prisma.trail.update).not.toHaveBeenCalled(); // Update do GPX não chamado
    expect(prisma.trail.findUnique).toHaveBeenCalledTimes(1);
  });
});
