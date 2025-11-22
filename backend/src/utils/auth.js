import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Gera um valor aleatório usado para fortalecer a criptografia da senha.
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compara a senha digitada pelo usuário (password) com a senha criptografada que está no banco (hash).
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Cria um token JWT que será enviado ao front-end após login e
// será usado para acessar rotas protegidas
export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

// Verifica se o token enviado é válido.
// Se for válido → retorna os dados do usuário.
// Se não for → lança erro (token expirado ou inválido).
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
