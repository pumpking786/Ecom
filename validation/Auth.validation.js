const Joi = require("joi");
class AuthValidation {
  validateRegister = (data) => {
    try {
      const userSchema = Joi.object({
        name: Joi.string().min(3).required().messages({
          "string.min": "Name must be at least 3 characters long",
          "any.required": "Name is required",
        }),
        email: Joi.string().email().required().messages({
          "string.email": "Please provide a valid email address",
          "any.required": "Email is required",
        }),
        password: Joi.string().min(8).required().messages({
          "string.min": "Password must be at least 8 characters long",
          "any.required": "Password is required",
        }),
        confirmPassword: Joi.string().required().messages({
          "any.required": "Confirm password is required",
        }),
      });
      const response = userSchema.validate(data);
      if (response.error) {
        throw new Error(response.error.details[0].message);
      }
      if (data.password !== data.confirmPassword) {
        throw new Error("Password and Confirm Password do not match");
      }
    } catch (err) {
      console.error("Validation error:", err.message);
      throw new Error(err.message);
    }
  };

  validateLogin = (data) => {
    try {
      const userSchema = Joi.object({
        email: Joi.string().email().required().messages({
          "string.email": "Please provide a valid email address",
          "any.required": "Email is required",
        }),
        password: Joi.string().required().messages({
          "any.required": "Password is required",
        }),
      });
      const response = userSchema.validate(data);
      if (response.error) {
        throw new Error(response.error.details[0].message);
      }
    } catch (err) {
      console.error("Validation error:", err.message);
      throw new Error(err.message);
    }
  };
  validateVerifyOtp = (data) => {
    try {
      const verifySchema = Joi.object({
        email: Joi.string().email().required().messages({
          "string.email": "Please provide a valid email address",
          "any.required": "Email is required",
        }),
        otp: Joi.number().required().messages({
          "any.required": "OTP is required",
        }),
      });
      const response = verifySchema.validate(data);
      if (response.error) {
        throw Error(response.error.details[0].message);
      }
    } catch (err) {
      console.error("Validation error:", err.message);
      throw new Error(err.message);
    }
    // catch (excep) {
    //   if (excep.code === 11000) {
    //     let keys = Object.keys(excep.keyPattern);
    //     throw keys.join(",") + "should be unique";
    //   } else {
    //     throw excep;
    //   }
  };
}
module.exports = { AuthValidation };
