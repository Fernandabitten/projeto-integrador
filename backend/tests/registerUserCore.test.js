import { registerUserCore } from "../src/core/registerUserCore";

describe("registerUserCore", () => {
  test("deve registrar usuário corretamente (happy path", () => {
    const users = [];

    const newUser = registerUserCore(users, {
      name: "Fernanda",
      email: "fer@trilhaconectada.com",
      password: "123456",
    });

    expect(newUser).toHaveProperty("id");
    expect(newUser.name).toBe("Fernanda");
    expect(newUser.email).toBe("fer@trilhaconectada.com");

    // garante que foi salvo no array
    expect(users.length).toBe(1);
  });

  test("deve falhar se faltar dados obrigatórios", () => {
    const users = [];

    expect(() => registerUserCore(users, { name: "Fê" })).toThrow(
      "Todos os campos são obrigatórios."
    );
  });

  test("deve falhar se o e-mail já estiver em uso", () => {
    const users = [
      { id: 1, name: "João", email: "joao@example.com", password: "111" },
    ];

    expect(() =>
      registerUserCore(users, {
        name: "Fernanda",
        email: "joao@example.com",
        password: "222",
      })
    ).toThrow("E-mail já está em uso.");
  });
});
