const Joi = require("joi");

class UserService {
  validateUser = (data) => {
    try {
      let userSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });
      let response = userSchema.validate(data);
      // console.log(response);
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
