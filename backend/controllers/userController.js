import { registerUser, loginUser } from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json({ success: true, message: "Registration successful", ...data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };
    res.status(200).cookie("token", data.token, cookieOptions).json({ success: true, message: "Login successful", ...data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};
