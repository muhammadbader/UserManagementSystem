// index.router.js
import { connectDB } from "../DB/connection.js";

import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import blogRouter from "./modules/blog/blog.router.js";
import libraryRouter from "../library/library.router.js";

import cors from "cors";

const initApp = (app, express) => {
  connectDB();

  app.use(cors());
  app.use(express.json());
  // in case you got /user in the endpoint, redirect to userRouter

  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/blogs", blogRouter);
  app.use("/library", libraryRouter);

  app.get("/health", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      status: "success",
    });
  });

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to the UMS API",
      status: "success",
    });
  });

  app.use((req, res, next) => {
    const error = new Error(`Page not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
  });

  // globla erorr handling
  app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
      message: err.message || "Something went wrong",
      status: "error",
    });
  });

  // authRouter.stack.forEach((r) => {
  //   console.log(
  //     "Method:",
  //     Object.keys(r.route.methods),
  //     "Path:",
  //     `/auth${r.route.path}`
  //   );
  // });
  // userRouter.stack.forEach((r) => {
  //   console.log(
  //     "Method:",
  //     Object.keys(r.route.methods),
  //     "Path:",
  //     `/user${r.route.path}`
  //   );
  // });
  // blogRouter.stack.forEach((r) => {
  //   console.log(
  //     "Method:",
  //     Object.keys(r.route.methods),
  //     "Path:",
  //     `/blog${r.route.path}`
  //   );
  // });
};

export default initApp;
