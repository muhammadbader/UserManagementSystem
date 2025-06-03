import AppError from "../utils/AppError.js";

const validation = (schema, method = "body") => {
  return (req, res, next) => {
    const inputData = { ...req.body, ...req.params };
    const vals = schema.validate(inputData, {
      abortEarly: false, // Validate all fields, not just the first error
    });

    if (vals?.error) {
      return next(new AppError(vals.error, 400));
    }

    // // method 1
    // const methods = ["body", "params"];
    // const errors = [];

    // methods.forEach((key) => {
    //   if (schema[key]) {
    //     // console.log(`Validating ${m}`);
    //     const results = schema.validate(req[method], {
    //       abortEarly: false, // Validate all fields, not just the first error
    //     });

    //     if (results.error) {
    //       // If validation fails, return a 400 status with the error details
    //       error.push(results.error);
    //     }
    //   }
    // });

    // console.log(errors.length > 0 ? errors : "No validation errors");
    // if (errors.length> 0) {
    //   return next(new AppError(errors, 400));
    // }

    return next();
  };
};

export default validation;
