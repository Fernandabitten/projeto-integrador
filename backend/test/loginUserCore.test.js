import { jest } from "@jest/globals";

// Mock do Prisma
jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock do comparePassword
jest.unstable_mockModule("../src/utils/auth.js", () => ({
  comparePassword: jest.fn(),
}));

const { prisma } = await import("../src/lib/prisma.js");
const { comparePassword } = await import("../src/utils/auth.js");
const { loginUserCore } = await import("../src/core/loginUserCore.js");

describe("loginUserCore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve lançar erro se o email estiver faltando", async () => {
    await expect(loginUserCore({ email: "", password: "123" })).rejects.toThrow(
      "E-mail e senha são obrigatórios."
    );
  });

  test("deve lançar erro se o usuário não existir", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      loginUserCore({ email: "x@x.com", password: "123" })
    ).rejects.toThrow("Usuário não encontrado.");
  });

  test("deve retornar erro se a senha estiver incorreta", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      name: "Fernanda",
      email: "fe@example.com",
      password: "hashed123",
    });

    comparePassword.mockResolvedValue(false);

    await expect(
      loginUserCore({ email: "fe@example.com", password: "errada" })
    ).rejects.toThrow("Senha incorreta.");
  });

  test("deve logar com sucesso", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      name: "Fernanda",
      email: "fe@example.com",
      password: "hashed123",
    });

    comparePassword.mockResolvedValue(true);

    const result = await loginUserCore({
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
