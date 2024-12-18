import { createUser, loginUser } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const result = await createUser(req.body.username, req.body.email, req.body.password);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
