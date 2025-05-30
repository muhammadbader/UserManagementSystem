import { Router } from "express";

import UserModel from "../../../DB/model/user.model.js";
import auth from "../../middleware/auth.js";
import admin from "../../middleware/admin.js";
import fileUpload from "../../utils/multer.js";

const router = Router();

// get all users
router.get("/", auth(), async (req, res) => {
  const users = await UserModel.findAll({
    attributes: ["username", "password"],
  });

  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: users });
});

// delete a user by ID
router.delete("/:id", auth(), admin(), async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);

  if (req.role != "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.destroy();
  return res.status(200).json({ message: "User deleted successfully" });
});

router.put("/:id", auth(), fileUpload().single("image"), async (req, res) => {
    // form data should be sent
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
});

export default router;
