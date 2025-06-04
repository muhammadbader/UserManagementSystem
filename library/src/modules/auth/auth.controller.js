import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendEmail } from "../../utils/SendEmail.js";
import AppError from "../../../../src/utils/AppError.js";
import UserModel from "../../../db/model/user.model.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("Registering user with email:", email);

  console.log("hasing password for user:", username);
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Check if user already exists
  console.log("Checking if user already exists with email:", email);
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError("User already exists", 409));
  }

  console.log("Creating new user with username:", username);
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("Sending welcome email to:", email);
  sendEmail(
    email,
    "Welcome to Node 10 Library",
    "Welcome to our platform!",
    "<b>Thank you for registering!</b>"
  )
    .then(() => console.log("Email sent successfully"))
    .catch((error) =>
      console.error("Error sending email (You can ignore):", error)
    );

  console.log("Generating JWT token for user:", username);
  const token = jwt.sign(
    { id: user._id, name: user.username },
    "library muhammad"
  );

  return res.status(201).json({ message: "User created successfully", token });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);

  const user = await UserModel.findOne({
    where: { email },
    attributes: ["id", "username", "password"],
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError("Invalid password", 401));
  }

  // JWT token generation
  const token = jwt.sign(
    { id: user.id, name: user.username },
    "library muhammad"
  );

  return res.status(200).json({ message: "Login successful", token });
};
