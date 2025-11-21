import { loginUserCore } from "../src/core/loginUserCore.js";

describe("loginUserCore", () => {
  let users;

  beforeEach(() => {
    users = [
      {
        id: 1,
        name: "Fernanda",
        email: "fernanda@example.com",
        password: "123456",
      },
    ];
  });

  test("deve retornar dados do usuário ao logar com sucesso", () => {
    const result = loginUserCore(users, {
      email: "fernanda@example.com",
      password: "123456",
    });

    expect(result).toEqual({
      id: 1,
      name: "Fernanda",
      email: "fernanda@example.com",
    });
  });

  test("deve lançar erro se email ou senha estiverem faltando", () => {
    expect(() => loginUserCore(users, { email: "", password: "" })).toThrow(
      "E-mail e senha são obrigatórios."
    );
  });

  test("deve lançar erro quando o usuário não existe", () => {
    expect(() =>
      loginUserCore(users, {
        email: "naoexiste@example.com",
        password: "123456",
      })
    ).toThrow("Usuário não encontrado.");
  });

  test("deve lançar erro quando a senha está incorreta", () => {
    expect(() =>
      loginUserCore(users, {
        email: "fernanda@example.com",
        password: "senha_errada",
      })
    ).toThrow("Senha incorreta.");
  });
});
