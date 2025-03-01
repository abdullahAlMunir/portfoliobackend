import { registerUser, loginUser } from '../services/authServices.js';

export async function register(req, res) {
  const result = await registerUser(req.body);
  return res.status(result.status === 'Success' ? 200 : 400).json(result);
}

export async function login(req, res) {
  const result = await loginUser(req.body);
  return res.status(result.status === 'Success' ? 200 : 400).json(result);
}
