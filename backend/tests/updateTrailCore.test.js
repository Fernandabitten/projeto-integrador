import { updateTrailCore } from "../src/core/updateTrailCore.js";

describe("updateTrailCore", () => {
  let trails;

  beforeEach(() => {
    trails = [
      {
        id: "t1",
        name: "Trilha Antiga",
        state: "CE",
        city: "Fortaleza",
        description: "Desc",
        difficulty: "Fácil",
        distance: 4,
        userId: "user123",
        updatedAt: new Date(),
      },
    ];
  });

  // ========== HAPPY PATH ==========
  test("deve atualizar a trilha corretamente", () => {
    const result = updateTrailCore(trails, "t1", {
      name: "Nova Trilha",
      userId: "user123",
    });

    expect(result.name).toBe("Nova Trilha");
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  // ========== Erro: trilha não encontrada ==========
  test("deve lançar erro se a trilha não existir", () => {
    expect(() =>
      updateTrailCore(trails, "inexistente", { userId: "user123" })
    ).toThrow("Trilha não encontrada.");
  });

  // ========== Erro: sem userId ==========
  test("deve lançar erro se userId não for enviado", () => {
    expect(() =>
      updateTrailCore(trails, "t1", { name: "abc" })
    ).toThrow("Usuário não autenticado.");
  });

  // ========== Erro: usuário sem permissão ==========
  test("deve lançar erro se o usuário não for o dono da trilha", () => {
    expect(() =>
      updateTrailCore(trails, "t1", { userId: "outro" })
    ).toThrow("Você não tem permissão para editar esta trilha.");
  });

  // ========== Atualização parcial ==========
  test("deve atualizar somente os campos enviados", () => {
    const result = updateTrailCore(trails, "t1", {
      description: "Nova desc",
      userId: "user123",
    });

    expect(result.description).toBe("Nova desc");
    expect(result.name).toBe("Trilha Antiga"); // unchanged
  });
});
