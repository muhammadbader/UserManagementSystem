import cloudinary from "../../utils/cloudinary.js";
import UserModel from "../../../DB/model/user.model.js";
import AppError from "../../utils/AppError.js";


const getAllUsers = async (req, res) => {
  const users = await UserModel.findAll({
    attributes: ["username", "password"],
  });

  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: users });
};

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);

  if (req.role != "admin") {
    return next(new AppError("Forbidden: Admins only", 403));
  }

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  await user.destroy();
  return res.status(200).json({ message: "User deleted successfully" });
};

const uploadFileById = async (req, res, next) => {
  // first approach
  const { id } = req.params;
  const user = await UserModel.findByPk(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // second approach: cloudinary
  const { secure_url } = await cloudinary.uploader.upload(req.file.path);
  user.profilePicture = secure_url;
  await user.save();

  return res.status(200).json({
    message: "User updated successfully",
  });
};

export { getAllUsers, deleteUserById, uploadFileById };
