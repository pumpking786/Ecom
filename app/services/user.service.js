const Joi = require("joi");
class UserService {
  validateRegister = (data) => {
    try {
      let userSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().required(),
      });
      let response = userSchema.validate(data);
      if (response.error) {
        throw response.error.details[0].message;
      }
      if (data.password !== data.confirmPassword) {
        throw "Password and Confirm Password do not match";
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  validateLogin = (data) => {
    try {
      let userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      let response = userSchema.validate(data);
      if (response.error) {
        throw response.error.details[0].message;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
module.exports = UserService;
