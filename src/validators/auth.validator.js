import { body } from "express-validator";
import { ALLOWED_ROLES } from "../utils/constants.js";

const authValidators = {
  validateRegisterBody: [
    body("userName").notEmpty().withMessage("User name is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .isLength({ min: 8 })
      .withMessage("Confirm password must be at least 8 characters long"),
    body("organizationName")
      .optional()
      .isString()
      .withMessage("Organization name must be a string"),
    body("parentNumber")
      .optional()
      .isNumeric()
      .withMessage("Parent number must be numeric"),
    body("subjects").notEmpty().withMessage("Subjects are required"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(ALLOWED_ROLES)
      .withMessage("Invalid role"),
  ],
  validateLoginBody: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validateForgotPasswordBody: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
  ],
  validateResetPasswordBody: [
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .isLength({ min: 8 })
      .withMessage("Confirm password must be at least 8 characters long"),
  ],
};

export default authValidators;
