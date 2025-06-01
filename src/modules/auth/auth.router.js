import { Router } from "express";

import validation from "../../middleware/validation.middleware.js";
import { registerUser, loginUser } from "./auth.controller.js";
import { resigterSchema, loginSchema } from "./auth.valid.js";


const router = Router();

// register user
router.post("/register", validation(resigterSchema), registerUser);

// login
router.post("/login", validation(loginSchema), loginUser);

export default router;
