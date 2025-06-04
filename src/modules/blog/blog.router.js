import { Router } from "express";
import { asyncHandler } from "../../utils/catchError.js";

import auth from "../../middleware/auth.middleware.js";
import { get_all_blogs, create_new_blog, getDetailsOfBlog } from "./blog.controller.js";
import validation from "../../middleware/validation.middleware.js";
import { blogDetailsSchema, createBlogSchema } from "./blog.valid.js";

const router = Router();

router.get("/", asyncHandler(get_all_blogs));

router.get("/:id", validation(blogDetailsSchema, "params"), asyncHandler(getDetailsOfBlog));
// create new blog
router.post("/", auth(), validation(createBlogSchema), asyncHandler(create_new_blog));

export default router;
