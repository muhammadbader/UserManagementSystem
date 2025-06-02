import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import { get_all_blogs, create_new_blog, getDetailsOfBlog } from "./blog.controller.js";
import { asyncHandler } from "../../utils/catchError.js";

const router = Router();

router.get("/", asyncHandler(get_all_blogs));

router.get("/:id", asyncHandler(getDetailsOfBlog));
// create new blog
router.post("/", auth(), asyncHandler(create_new_blog));

export default router;
