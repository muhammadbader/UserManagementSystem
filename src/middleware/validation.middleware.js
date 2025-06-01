const validation = (schema) => {
    return (req, res, next) => {
        const results = schema.validate(req.body, {
            abortEarly: false, // Validate all fields, not just the first error
        });
        
        if (results.error) {
            // If validation fails, return a 400 status with the error details
            return res.status(400).json({
                message: "Validation error",
                errors: results.error.details.map((detail) => detail.message),
            });
        }
        return next(); // If validation passes, proceed to the next middleware
    };
}

export default validation;