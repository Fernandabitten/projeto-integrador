import { jest } from "@jest/globals";

// -----------------------------
// Declarar Variáveis para Acesso aos Mocks no beforeEach
// -----------------------------
let prisma;
let uploadPhotoStream, uploadFileStream, deleteFromSupabase;

// Variável de ambiente simulada
process.env.SUPABASE_BUCKET = "test-bucket";

// -----------------------------
// Mock do Prisma
// -----------------------------
jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  prisma: {
    trail: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    photo: {
      findUnique: jest.fn(),
      delete: jest.fn(),
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
  deleteFromSupabase: jest.fn(),
}));

// -----------------------------
// Importação do Módulo Principal
// -----------------------------
const { updateTrailFullCore } = await import(
  "../src/core/updateTrailFullCore.js"
);

// -----------------------------
// Mock Helper para Requisição
// -----------------------------
const mockReq = ({ params = {}, body = {}, files = {} } = {}) => ({
  params,
  body,
  files, // objeto estruturado (photos, gpx)
});

// ===============================================
// INÍCIO DOS TESTES
// ===============================================

describe("updateTrailFullCore", () => {
  // Atribuição das referências de mock no beforeEach
  beforeEach(async () => {
    jest.clearAllMocks();

    // Re-importa os módulos mockados para garantir que as variáveis apontem para as jest.fn() corretas
    const prismaModule = await import("../src/lib/prisma.js");
    const uploadServiceModule = await import(
      "../src/services/uploadService.js"
    );

    // Atribuição das referências mockadas:
    prisma = prismaModule.prisma;
    uploadPhotoStream = uploadServiceModule.uploadPhotoStream;
    uploadFileStream = uploadServiceModule.uploadFileStream;
    deleteFromSupabase = uploadServiceModule.deleteFromSupabase;
  });

  // -----------------------------------------
  // TESTE 1 — Trilhas inexistente
  // -----------------------------------------
  test("deve lançar erro se a trilha não existir", async () => {
    // A única chamada findUnique (buscarTrilhaOuErro) deve retornar null
    prisma.trail.findUnique.mockResolvedValue(null);

    const req = mockReq({
      params: { id: 123 },
      body: {
        data: JSON.stringify({
          userId: 1,
          name: "Nova trilha",
        }),
      },
    });

    await expect(updateTrailFullCore(req)).rejects.toThrow(
      "Trilha não encontrada."
    );
  });

  // -----------------------------------------
  // TESTE 2 — Atualização com sucesso (Incluindo GPX e Fotos)
  // -----------------------------------------
  test("deve atualizar a trilha com sucesso, incluindo fotos e gpx", async () => {
    // 1. Definição dos objetos de retorno sequenciais

    // Estado da trilha antes da atualização (para a 1ª busca)
    const mockTrailEncontrada = {
      id: 10,
      userId: 1,
      name: "Antiga Trilha",
      photos: [],
      gpxUrl: "https://fake.url.com/test-bucket/10/old_gpx.gpx", // GPX antigo para ser deletado
    };

    // Estado da trilha após a atualização (para a 2ª busca final)
    const mockTrailRetorno = {
      id: 10,
      userId: 1,
      name: "Nova Trilha De Teste", // Esperamos TitleCase
      city: "Cidade X",
      state: "UF",
      photos: [{ id: 101, url: "url1", path: "path1" }],
      gpxUrl: "gpx_url_final",
    };

    // 2. Mocks Sequenciais e Globais

    // 1ª Chamada de findUnique (buscarTrilhaOuErro)
    prisma.trail.findUnique.mockResolvedValueOnce(mockTrailEncontrada);
    // 2ª Chamada de findUnique (buscarTrilhaCompleta)
    prisma.trail.findUnique.mockResolvedValueOnce(mockTrailRetorno);

    // Mocks de Operações (Não precisa de sequência)
    prisma.trail.update.mockResolvedValue({});
    prisma.photo.findUnique.mockResolvedValue({
      id: 201,
      path: "10/photos/removed.jpg",
    }); // Simula foto a ser removida
    prisma.photo.delete.mockResolvedValue({});
    prisma.photo.createMany.mockResolvedValue({ count: 2 });

    // Mocks de Upload/Supabase
    deleteFromSupabase.mockResolvedValue(true);
    uploadPhotoStream.mockResolvedValue({ url: "url1", path: "path1" });
    uploadFileStream.mockResolvedValue({
      url: "gpx_url_final",
      path: "gpx_path_final",
    });

    // 3. Criação da Requisição (Estrutura de arquivos e payload)
    const req = mockReq({
      params: { id: 10 },
      body: {
        data: JSON.stringify({
          userId: 1,
          name: "nova trilha de teste", // Input em lowercase
          city: "Cidade X",
          state: "UF",
          removedPhotos: [201], // ID da foto a ser removida
        }),
      },
      files: {
        photos: [
          { originalname: "foto_nova_1.jpg" },
          { originalname: "foto_nova_2.jpg" },
        ],
        gpx: [{ originalname: "gpx_novo.gpx" }],
      },
    });

    // 4. Execução
    const result = await updateTrailFullCore(req);

    // 5. Asserções

    // Verifica se os dados básicos foram atualizados (aplicando Title Case)
    expect(prisma.trail.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: "Nova Trilha De Teste",
          city: "Cidade X",
        }),
      })
    );

    // Verifica a remoção de fotos antigas (deleteFromSupabase e prisma.photo.delete)
    expect(prisma.photo.findUnique).toHaveBeenCalledWith({
      where: { id: 201 },
    });
    expect(deleteFromSupabase).toHaveBeenCalledWith("10/photos/removed.jpg");
    expect(prisma.photo.delete).toHaveBeenCalledWith({ where: { id: 201 } });

    // Verifica o upload de novas fotos (createMany)
    expect(prisma.photo.createMany).toHaveBeenCalled();

    // Verifica a substituição do GPX
    expect(deleteFromSupabase).toHaveBeenCalledWith("10/old_gpx.gpx"); // Deletou o antigo
    expect(uploadFileStream).toHaveBeenCalledWith("10", req.files.gpx[0]); // Fez upload do novo

    // Verifica o retorno final (Compara com o mockTrailRetorno atualizado)
    expect(result).toEqual(mockTrailRetorno);
  });
});
