import { sendSuccess, sendError } from "../utils/httpResponses.js";
import { registerUserCore } from "../core/registerUserCore.js";
import { loginUserCore } from "../core/loginUserCore.js";
import { generateToken } from "../utils/auth.js";


// ===========================
//   POST /auth/register
// ===========================
export async function registerUser(req, res) {
  try {
    const result = await registerUserCore(users, req.body);
    return sendSuccess(res, 201, result);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

// ===========================
//      POST /auth/login
// ===========================
export async function loginUser(req, res) {
  try {
    const user = await loginUserCore(users, req.body);
    // gera token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return sendSuccess(res, 200, {
      user,
      token,
    });
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

