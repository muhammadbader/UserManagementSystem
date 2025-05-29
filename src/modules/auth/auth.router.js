import { Router } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../../../DB/model/user.model.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({ message: "User created successfully" });

});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ where: { email }, attributes: ["username", "password"] });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // JWT token generatio
  const token = jwt.sign({ id: user._id, name: user.username }, "muhammad bdeir");
  return res.status(200).json({ message: "Login successful" , token});
})

export default router;