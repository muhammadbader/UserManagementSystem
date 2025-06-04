import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller.js";
import { errorCatcher } from "../../utils/catchError.js";
import { loginSchema, registerSchema } from "./auth.valid.js";
import validate from "../../middleware/validate.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), errorCatcher(registerUser));
router.post("/login", validate(loginSchema), errorCatcher(loginUser));

export default router;
