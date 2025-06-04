import AppError from "./appError.js";

export const errorCatcher = (fun) => {
  return async (req, res, next) => {
    try {
      console.log("Error catcher middleware is running");
      await fun(req, res, next);
    } catch (error) {
      console.error("Error in errorCatcher:", error);
      // Pass the error to the next middleware
      return new AppError(error, 500);
    }
  };
};
