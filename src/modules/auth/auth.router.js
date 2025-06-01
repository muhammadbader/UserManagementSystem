import { Router } from "express";

import validation from "../../middleware/validation.middleware.js";
import { registerUser, loginUser } from "./auth.controller.js";
import { resigterSchema, loginSchema } from "./auth.valid.js";
import { asyncHandler } from "../../utils/catchError.js";


const router = Router();

// register user
router.post("/register", validation(resigterSchema), asyncHandler(registerUser));

// login
router.post("/login", validation(loginSchema), asyncHandler(loginUser));

export default router;
