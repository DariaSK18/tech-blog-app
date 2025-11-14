export const signupValidation = {
  username: {
    bail: true,
    exists: { errorMessage: "Username is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Must be at least 3-20 characters",
    },
    stripLow: true,
    trim: true,
  },
  email: {
    bail: true,
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    normalizeEmail: true,
    trim: true,
  },
  password: {
    bail: true,
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "Must be a string" },
    notEmpty: { errorMessage: "Must be not empty" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Must be at least 6 characters",
    },
    matches: {
      options: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      errorMessage: "Password must contain at least one letter and one number",
    },
    trim: true,
    stripLow: true,
  },
};
