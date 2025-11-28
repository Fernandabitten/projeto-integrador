import { createTrailCore } from "../src/core/createTrailCore.js";

describe("createTrailCore", () => {
  test("deve criar trilha corretamente (happy path)", () => {
    const trails = [];
    const newTrail = createTrailCore(trails, {
      name: "Trilha X",
      state: "CE",
      city: "Fortaleza",
      description: "Legal",
      difficulty: "Fácil",
      distance: 3,
      userId: "123",
    });

    expect(newTrail.name).toBe("Trilha X");
  });

  test("deve falhar se faltar dados obrigatórios", () => {
    expect(() => createTrailCore([], { name: "X" })).toThrow(
      "Usuário não autenticado."
    );
  });

  test("deve falhar se userId não existir", () => {
    expect(() =>
      createTrailCore([], {
        name: "X",
        state: "CE",
        city: "Fortaleza",
        description: "Teste",
        difficulty: "Fácil",
        distance: 4,
      })
    ).toThrow("Usuário não autenticado.");
  });
});