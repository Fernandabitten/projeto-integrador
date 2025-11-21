import { sendSuccess, sendError } from "../utils/httpResponses.js";
import { registerUserCore } from "../core/registerUserCore.js";
import { loginUserCore } from "../core/loginUserCore.js";

// "Banco de dados" em memória
const users = [];

// ===========================
//   POST /auth/register
// ===========================
export function registerUser(req, res) {
  try {
    const result = registerUserCore(users, req.body);
    return sendSuccess(res, 201, result);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

// ===========================
//      POST /auth/login
// ===========================
export function loginUser(req, res) {
  try {
    const result = loginUserCore(users, req.body);
    return sendSuccess(res, 200, result);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}
