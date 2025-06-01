import blogModel from "../../../DB/model/blog.model.js";
import UserModel from "../../../DB/model/user.model.js";

const get_all_blogs = async (req, res) => {
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

const create_new_blog = async (req, res) => {
  const { title, description } = req.body;
  const { user } = req;

  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Error creating blog",
      error: error.message,
    });
  }
};

export { get_all_blogs, create_new_blog };