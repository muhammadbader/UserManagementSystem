import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import { get_all_blogs, create_new_blog } from "./blog.controller.js";

const router = Router();

router.get("/", get_all_blogs);

// create new blog
router.post("/", auth(), create_new_blog);

export default router;
