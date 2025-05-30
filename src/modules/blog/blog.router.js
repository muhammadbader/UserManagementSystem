import { Router } from "express";
import blogModel from "../../../DB/model/blog.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const blogs = await blogModel.findAll({});
  return res.status(200).json({
    message: "Blogs fetched successfully",
    blogs,
  });
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const blog = await blogModel.create({
    title,
    description,
  });
  return res.status(201).json({
    message: "Blog created successfully", blog
  });
});

export default router;
