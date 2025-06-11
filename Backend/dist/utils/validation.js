import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            return next();
        }
    };
};
export const loginValidation = [
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("password must be at least 6 characters long")
];
export const signUpValidation = [
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidation
];
//# sourceMappingURL=validation.js.map