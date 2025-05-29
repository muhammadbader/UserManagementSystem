import { Router } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../../../DB/model/user.model.js";

const router = Router();

const verifyToken = (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "muhammad bdeir");
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/", async (req, res) => {
  const users = await UserModel.findAll({
    attributes: ["username", "password"],
  });

  verifyToken(req, res);

  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: users });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);

  verifyToken(req, res);

  if (req.role != "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.destroy();
  return res.status(200).json({ message: "User deleted successfully" });
});

export default router;
