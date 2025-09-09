const Joi = require("joi");
const DbService = require("./db.service");
class UserService extends DbService {
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
  createUser = async (data) => {
    try {
      return await this.db.collection("users").insertOne(data);
    } catch (excep) {
      throw excep;
    }
  };
}
module.exports = UserService;
