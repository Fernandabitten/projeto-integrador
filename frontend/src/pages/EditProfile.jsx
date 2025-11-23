import React, { useState, useEffect } from "react";
import { updateUser } from "../services/authService";
import toast from "react-hot-toast";


export default function EditarCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfirmar, setSenhaConfirmar] = useState("");

  // Carrega os dados do usuário logado
  useEffect(() => {
    // Busca o usuário salvo no localStorage
    const usuario = JSON.parse(localStorage.getItem("user"));

    if (usuario) {
      setEmail(usuario.email || "");
      setNome(usuario.nome || usuario.name || "");
    }
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem("user"));

  if (!usuario?.id) {
    toast.error("Usuário não encontrado no localStorage");
    return;
  }

  const data = {
    id: usuario.id,     // 👈 AQUI ESTAVA FALTANDO!!
    name: nome,
    email: email,
  };

  const result = await updateUser(data);

  if (result.error) {
    toast.error(result.error);
  } else {
    toast.success("Perfil atualizado!");

    // Atualiza localStorage também
    localStorage.setItem(
      "user",
      JSON.stringify({ ...usuario, name: nome, email: email })
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-roboto">
      <div className="bg-white p-10 w-[420px] rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Editar Cadastro
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">
            E-mail (não pode ser alterado)
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 mb-5 rounded bg-[#f1f1f1] opacity-70 cursor-not-allowed"
          />

          <label className="block mb-2 font-medium">Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 mb-5 rounded bg-[#f1f1f1] focus:outline-none"
          />

          <label className="block mb-2 font-medium">Senha atual</label>
          <input
            type="password"
            placeholder="Digite sua senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            className="w-full p-3 mb-5 rounded bg-[#f1f1f1] focus:outline-none"
          />

          <label className="block mb-2 font-medium">Nova senha</label>
          <input
            type="password"
            placeholder="Digite a nova senha"
            value={senhaNova}
            onChange={(e) => setSenhaNova(e.target.value)}
            className="w-full p-3 mb-5 rounded bg-[#f1f1f1] focus:outline-none"
          />

          <label className="block mb-2 font-medium">Confirmar nova senha</label>
          <input
            type="password"
            placeholder="Confirme a nova senha"
            value={senhaConfirmar}
            onChange={(e) => setSenhaConfirmar(e.target.value)}
            className="w-full p-3 mb-8 rounded bg-[#f1f1f1] focus:outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 bg-[#00d655] text-[#0d1608] font-semibold rounded hover:bg-[#00b94a] transition"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}
