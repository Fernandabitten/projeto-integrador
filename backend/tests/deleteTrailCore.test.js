import { deleteTrailCore } from "../src/core/deleteTrailCore.js";

describe("deleteTrailCore", () => {
  let trails;

  beforeEach(() => {
    trails = [
      {
        id: "t-1",
        name: "Trilha Teste",
        state: "CE",
        city: "Fortaleza",
        description: "Muito boa",
        difficulty: "Média",
        distance: 10,
        userId: "user123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  // ---------------------------------------------------------
  // HAPPY PATH
  // ---------------------------------------------------------
  test("deve deletar trilha corretamente (happy path)", () => {
    const result = deleteTrailCore(trails, "t-1", "user123");

    expect(result).toEqual({ message: "Trilha excluída com sucesso." });
    expect(trails.length).toBe(0); // array deve ficar vazio
  });

  // ---------------------------------------------------------
  // ERROS / EXCEÇÕES
  // ---------------------------------------------------------
  test("deve lançar erro se o usuário não estiver autenticado", () => {
    expect(() => deleteTrailCore(trails, "t-1", null)).toThrow(
      "Usuário não autenticado."
    );
  });

  test("deve lançar erro se a trilha não existir", () => {
    expect(() => deleteTrailCore(trails, "t-999", "user123")).toThrow(
      "Trilha não encontrada."
    );
  });

  test("deve lançar erro se o usuário não for o dono da trilha", () => {
    expect(() => deleteTrailCore(trails, "t-1", "outro-user")).toThrow(
      "Você não tem permissão para excluir esta trilha."
    );
  });

  // ---------------------------------------------------------
  // VALORES LIMÍTROFES / DEFAULTS
  // ---------------------------------------------------------
  test("deve lançar erro quando o ID for string vazia (valor limítrofe)", () => {
    expect(() => deleteTrailCore(trails, "", "user123")).toThrow(
      "Trilha não encontrada."
    );
  });

  test("deve lançar erro quando o ID for undefined", () => {
    expect(() => deleteTrailCore(trails, undefined, "user123")).toThrow(
      "Trilha não encontrada."
    );
  });

  // ---------------------------------------------------------
  // TRIM / PARSE / CONVERSÕES (se houver)
  // ---------------------------------------------------------
  test("não deve deletar trilha se o ID vier com espaços (trim não automático)", () => {
    // ID real é "t-1"
    expect(() => deleteTrailCore(trails, " t-1 ", "user123")).toThrow(
      "Trilha não encontrada."
    );

    // garante que não removeu
    expect(trails.length).toBe(1);
  });
});
