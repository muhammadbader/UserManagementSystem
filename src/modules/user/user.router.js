import { Router } from "express";
import { asyncHandler } from "../../utils/catchError.js";

import auth from "../../middleware/auth.middleware.js";
import admin from "../../middleware/admin.middleware.js";
import fileUpload from "../../utils/multer.js";
import { getAllUsers, deleteUserById, uploadFileById } from "./user.controller.js";

const router = Router();

// get all users
router.get("/", auth(), asyncHandler(getAllUsers));

// delete a user by ID
router.delete("/:id", auth(), admin(), asyncHandler(deleteUserById));

// upload file, use in postman the form-data option inside Body tab
router.put("/:id", auth(), fileUpload().single("image"), asyncHandler(uploadFileById));

export default router;
