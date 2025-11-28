import { jest } from "@jest/globals";

// =====================================================
// 1. DEFINIR VARIÁVEIS DE AMBIENTE (ANTES DE TUDO)
// =====================================================
process.env.SUPABASE_BUCKET = "teste";

// =====================================================
// 2. MOCKS — Devem vir ANTES dos imports reais
// =====================================================
jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  prisma: {
    trail: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    photo: {
      deleteMany: jest.fn(),
    },
  },
}));

jest.unstable_mockModule("../src/services/uploadService.js", () => ({
  deleteFromSupabase: jest.fn(),
}));

// =====================================================
// 3. IMPORTS REAIS — Somente após mocks estarem definidos
// =====================================================
const { deleteTrailCore } = await import("../src/core/deleteTrailCore.js");
const { prisma } = await import("../src/lib/prisma.js");
const { deleteFromSupabase } = await import("../src/services/uploadService.js");

// =====================================================
// 4. TESTES
// =====================================================
describe("deleteTrailCore", () => {
  const userId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve deletar trilha com sucesso (happy path)", async () => {
    prisma.trail.findUnique.mockResolvedValue({
      id: 1,
      userId,
      gpxUrl: "https://xyzcompany.supabase.co/storage/v1/object/public/teste/pasta/file.gpx",
      photos: [
        { path: "fotos/f1.jpg" },
        { path: "fotos/f2.jpg" },
      ],
    });

    prisma.photo.deleteMany.mockResolvedValue({});
    prisma.trail.delete.mockResolvedValue({});

    const result = await deleteTrailCore(1, userId);

    // 2 fotos + 1 GPX → 3 chamadas
    expect(deleteFromSupabase).toHaveBeenCalledTimes(3);

    expect(deleteFromSupabase).toHaveBeenCalledWith("fotos/f1.jpg");
    expect(deleteFromSupabase).toHaveBeenCalledWith("fotos/f2.jpg");
    expect(deleteFromSupabase).toHaveBeenCalledWith("pasta/file.gpx");

    expect(prisma.photo.deleteMany).toHaveBeenCalledWith({
      where: { trailId: 1 },
    });

    expect(prisma.trail.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toBe(true);
  });

  test("deve falhar se trilha não existir", async () => {
    prisma.trail.findUnique.mockResolvedValue(null);

    await expect(deleteTrailCore(999, userId))
      .rejects
      .toThrow("Trilha não encontrada.");
  });

  test("deve impedir usuário não dono da trilha", async () => {
    prisma.trail.findUnique.mockResolvedValue({
      id: 1,
      userId: "outro",
      photos: [],
    });

    await expect(deleteTrailCore(1, userId))
      .rejects
      .toThrow("Você não pode excluir esta trilha.");
  });

  test("deve continuar mesmo se deleteFromSupabase falhar", async () => {
    prisma.trail.findUnique.mockResolvedValue({
      id: 1,
      userId,
      gpxUrl: "https://supabase.storage/storage/v1/object/public/teste/pasta/file.gpx",
      photos: [{ path: "fotos/f1.jpg" }],
    });

    deleteFromSupabase.mockRejectedValue(new Error("erro ao deletar"));

    prisma.photo.deleteMany.mockResolvedValue({});
    prisma.trail.delete.mockResolvedValue({});

    const result = await deleteTrailCore(1, userId);

    expect(deleteFromSupabase).toHaveBeenCalledTimes(2); // foto + gpx
    expect(prisma.photo.deleteMany).toHaveBeenCalled();
    expect(prisma.trail.delete).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test("não deve tentar deletar GPX se gpxUrl for null", async () => {
    prisma.trail.findUnique.mockResolvedValue({
      id: 1,
      userId,
      gpxUrl: null,
      photos: [],
    });

    prisma.photo.deleteMany.mockResolvedValue({});
    prisma.trail.delete.mockResolvedValue({});

    const result = await deleteTrailCore(1, userId);

    expect(deleteFromSupabase).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
