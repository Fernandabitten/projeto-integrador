import { jest } from "@jest/globals";

// Mock do módulo
jest.unstable_mockModule("../src/utils/auth.js", () => ({
  comparePassword: jest.fn(),
}));

// Importar após registrar o mock
const { loginUserCore } = await import("../src/core/loginUserCore.js");
const { comparePassword } = await import("../src/utils/auth.js");

describe("loginUserCore", () => {
  let users;

  beforeEach(() => {
    users = [
      {
        id: 1,
        name: "Fernanda",
        email: "fe@example.com",
        password: "hashed123",
      },
    ];

    jest.clearAllMocks();
  });

  test("deve lançar erro se o email estiver faltando", async () => {
    await expect(
      loginUserCore(users, { email: "", password: "123" })
    ).rejects.toThrow("E-mail e senha são obrigatórios.");
  });

  test("deve lançar erro se o usuário não existir", async () => {
    await expect(
      loginUserCore(users, { email: "x@x.com", password: "123" })
    ).rejects.toThrow("Usuário não encontrado.");
  });

  test("deve retornar erro se a senha estiver incorreta", async () => {
    comparePassword.mockResolvedValue(false);

    const result = await loginUserCore(users, {
      email: "fe@example.com",
      password: "errada",
    });

    expect(result).toEqual({
      status: 401,
      message: "Senha incorreta.",
    });
  });

  test("deve logar com sucesso", async () => {
    comparePassword.mockResolvedValue(true);

    const result = await loginUserCore(users, {
      email: "fe@example.com",
      password: "123",
    });

    expect(result).toEqual({
      id: 1,
      name: "Fernanda",
      email: "fe@example.com",
    });
  });
});
