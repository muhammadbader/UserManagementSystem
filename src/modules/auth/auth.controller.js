import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendEmail } from "../../utils/SendEmail.js";
import UserModel from "../../../DB/model/user.model.js";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  // Check if user already exists
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  sendEmail(
    email,
    "Welcome to Node 10 UMS",
    "Welcome to our platform!",
    "<b>Thank you for registering!</b>"
  )
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.error("Error sending email:", error));

  const token = jwt.sign(
    { id: user._id, name: user.username },
    "muhammad bdeir"
  );
  return res.status(201).json({ message: "User created successfully", token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    where: { email },
    attributes: ["id", "username", "password"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // JWT token generatio
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "muhammad bdeir"
  );
  return res.status(200).json({ message: "Login successful", token });
}

export { registerUser, loginUser };