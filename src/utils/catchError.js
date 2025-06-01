export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error in asyncHandler:", error);
      // Pass the error to the next middleware
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred.",
        error: error.message || "Internal Server Error",
      });
    }
  };
};
