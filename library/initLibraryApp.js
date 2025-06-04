// initLibraryApp.js
import { connectDB } from "./db/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import bookRouter from "./src/modules/book/book.router.js";

const initLibraryApp = (libraryRouter, express) => {
  connectDB();
  libraryRouter.use(express.json());

  // Mount the auth router
  libraryRouter.get("/health", (req, res) => {
    console.log("Library server is running {Health Check}");
    res.status(200).json({
      message: "Library server is running",
      status: "success",
    });
  });

  // routers
  libraryRouter.use("/auth", authRouter);
  libraryRouter.use("/book", bookRouter);

  libraryRouter.use((req, res, next) => {
    const error = new Error(`Book not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
  });

  // globla erorr handling
  libraryRouter.use((err, req, res, next) => {
    res.status(err.statusCode).json({
      message: err.message || "Something went wrong in the library",
      status: "error",
    });
  });
};

export default initLibraryApp;
