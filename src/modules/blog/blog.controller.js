import blogModel from "../../../DB/model/blog.model.js";
import UserModel from "../../../DB/model/user.model.js";

const get_all_blogs = async (req, res, next) => {
  const blogs = await blogModel.findAll({
    attributes: ["id", "title", "description"], // Specify the attributes you want to return
    include: {
      model: UserModel, // Assuming you have a User model defined
      attributes: ["id", "username"], // Include only necessary user attributes
    },
  });
  return res.status(200).json({
    message: "Blogs fetched successfully",
    blogs,
  });
};

const create_new_blog = async (req, res, next) => {
  const { title, description } = req.body;
  const { user } = req;

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const blog = await blogModel.create({
    UserId: user.id, // Assuming you have user ID from auth middleware
    title,
    description,
  });
  // got it from auth middleware
  return res.status(201).json({
    message: "Blog created successfully",
    blog,
  });
};

const getDetailsOfBlog = async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.findByPk(id);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  return res.status(200).json({
    message: "Blog details fetched successfully",
    blog,
  });
}

export { get_all_blogs, create_new_blog, getDetailsOfBlog };
