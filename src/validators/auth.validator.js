module.exports = {
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
      .notEmpty()
      .withMessage("Organization name is required"),
    body("parentNumber").notEmpty().withMessage("Parent number is required"),
    body("subjects").notEmpty().withMessage("Subjects are required"),
    body("role").notEmpty().withMessage("Role is required"),
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
