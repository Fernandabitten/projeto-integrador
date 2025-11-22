import jwt from "jsonwebtoken";
import { sendError } from "../utils/httpResponses.js";

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return sendError(res, 401, "Token não informado.");
  }

  const [, token] = header.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // pega user.id, user.email, user.name

    next();
  } catch (err) {
    return sendError(res, 401, "Token inválido.");
  }
}
