import { jest } from "@jest/globals";

// Mock do Prisma
jest.unstable_mockModule("../src/lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mock de hashPassword e generateToken
jest.unstable_mockModule("../src/utils/auth.js", () => ({
  hashPassword: jest.fn(),
  generateToken: jest.fn(),
}));

const { prisma } = await import("../src/lib/prisma.js");
const { hashPassword, generateToken } = await import("../src/utils/auth.js");
const { registerUserCore } = await import("../src/core/registerUserCore.js");

describe("registerUserCore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve lançar erro se algum campo estiver faltando", async () => {
    await expect(
      registerUserCore({
        name: "",
        email: "teste@email.com",
        password: "123",
      })
    ).rejects.toThrow("Todos os campos são obrigatórios.");
  });

  test("deve lançar erro se o e-mail já estiver em uso", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      name: "User",
      email: "teste@email.com",
      password: "xxx",
    });

    await expect(
      registerUserCore({
        name: "Fernanda",
        email: "teste@email.com",
        password: "123",
      })
    ).rejects.toThrow("E-mail já está em uso.");
  });

  test("deve registrar o usuário com sucesso", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    hashPassword.mockResolvedValue("hashed123");
    generateToken.mockReturnValue("fake_token_123");

    prisma.user.create.mockResolvedValue({
      id: 1,
      name: "Fernanda",
      email: "fe@example.com",
      password: "hashed123",
    });

    const result = await registerUserCore({
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

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "Fernanda",
        email: "fe@example.com",
        password: "hashed123",
      },
    });
  });
});
