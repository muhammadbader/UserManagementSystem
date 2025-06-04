import AppError from "../utils/appError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const inputData = { ...req.body, ...req.params };
    console.log("Validating input data:", inputData);

    const { error } = schema.validate(inputData, {
      abortEarly: false, // Validate all fields, not just the first error
    });

    if (error) {
      return next(new AppError(error, 400));
    }

    return next();
  };
};

export default validate;
