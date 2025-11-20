// import { users } from "../data/users.js";
import { registerUserCore } from "../core/registerUserCore.js";
import { loginUserCore } from "../core/loginUserCore.js";

import { sendSuccess, sendError } from "../utils/httpResponses.js";

/* =================================
      POST /auth/register
================================= */
export function registerUser(req, res) {
  try {
    const novoUser = registerUserCore(users, req.body);

    return sendSuccess(res, 201, {
      id: novoUser.id,
      name: novoUser.name,
      email: novoUser.email,
    });

  } catch (error) {
    return sendError(res, error.status || 400, error.message);
  }
}

/* =================================
      POST /auth/login
================================= */
export function loginUser(req, res) {
  try {
    const usuario = loginUserCore(users, req.body);

    return sendSuccess(res, 200, {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
    });

  } catch (error) {
    return sendError(res, error.status || 400, error.message);
  }
}
