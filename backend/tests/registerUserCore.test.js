import { jest } from "@jest/globals";

// Mock de módulo em ESM
jest.unstable_mockModule("../src/utils/auth.js", () => ({
  hashPassword: jest.fn(),
  generateToken: jest.fn(),
}));

// Importa DEPOIS do mock
const { registerUserCore } = await import("../src/core/registerUserCore.js");
const { hashPassword, generateToken } = await import("../src/utils/auth.js");

describe("registerUserCore", () => {
  let users;

  beforeEach(() => {
    users = [];
    jest.clearAllMocks();
  });

  test("deve lançar erro se algum campo estiver faltando", async () => {
    await expect(
      registerUserCore(users, {
        name: "",
        email: "teste@email.com",
        password: "123",
      })
    ).rejects.toThrow("Todos os campos são obrigatórios.");
  });

  test("deve lançar erro se o e-mail já estiver em uso", async () => {
    users.push({
      id: 1,
      name: "Usuário",
      email: "teste@email.com",
      password: "xxx",
    });

    await expect(
      registerUserCore(users, {
        name: "Fernanda",
        email: "teste@email.com",
        password: "123",
      })
    ).rejects.toThrow("E-mail já está em uso.");
  });

  test("deve registrar o usuário com sucesso", async () => {
    hashPassword.mockResolvedValue("hashed123");
    generateToken.mockReturnValue("fake_token_123");

    const result = await registerUserCore(users, {
      name: "Fernanda",
      email: "fe@example.com",
      password: "123",
    });

    expect(result).toEqual({
      user: {
        id: 1,
        name: "Fernanda",
        email: "fe@example.com",
      },
      token: "fake_token_123",
    });

    expect(users.length).toBe(1);
    expect(users[0].password).toBe("hashed123");
  });
});
