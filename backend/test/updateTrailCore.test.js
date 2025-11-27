import { updateTrailCore } from "../src/core/updateTrailCore.js";

describe("updateTrailCore", () => {
  let trails;

  beforeEach(() => {
    // Reset para um estado limpo antes de cada teste
    trails = [
      {
        id: "t1",
        name: "Trilha A",
        state: "CE",
        city: "Fortaleza",
        description: "Teste",
        difficulty: "Fácil",
        distance: 5,
        userId: "user-123",
        updatedAt: new Date("2025-01-01"),
      },
    ];
  });

  test("deve atualizar trilha corretamente (happy path)", () => {
    const updatedTrail = updateTrailCore(trails, "t1", {
      name: "Trilha Atualizada",
      userId: "user-123",
    });

    expect(updatedTrail.name).toBe("Trilha Atualizada");
    expect(updatedTrail.updatedAt).not.toEqual(new Date("2025-01-01"));
  });

  test("deve falhar se trilha não existir", () => {
    expect(() =>
      updateTrailCore(trails, "t999", {
        name: "X",
        userId: "user-123",
      })
    ).toThrow("Trilha não encontrada.");
  });

  test("deve falhar se userId não existir", () => {
    expect(() =>
      updateTrailCore(trails, "t1", {
        name: "Nova",
        // sem userId
      })
    ).toThrow("Usuário não autenticado.");
  });

  test("deve falhar se userId não for dono da trilha", () => {
    expect(() =>
      updateTrailCore(trails, "t1", {
        name: "Nova",
        userId: "outro-user",
      })
    ).toThrow("Você não tem permissão para editar esta trilha.");
  });

  test("garante que somente os campos enviados são atualizados", () => {
    const before = trails[0].description;

    const updated = updateTrailCore(trails, "t1", {
      name: "Alterada",
      userId: "user-123",
    });

    expect(updated.description).toBe(before); // não alterou
    expect(updated.name).toBe("Alterada");
  });
});