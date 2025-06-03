import { connectDB } from "../DB/connection.js";

import userRouter from "./modules/user/user.router.js";
import authRouter from "./modules/auth/auth.router.js";
import blogRouter from "./modules/blog/blog.router.js";

import cors from "cors";


const initApp = (app, express) => {
  connectDB();

  app.use(cors());
  app.use(express.json());
  // in case you got /user in the endpoint, redirect to userRouter
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/blogs", blogRouter);
  app.use("/health", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      status: "success",
    });
  });

  // globla erorr handling
  app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
      message: err.message || "Something went wrong",
      status: "error",
    });
  });
};

export default initApp;
