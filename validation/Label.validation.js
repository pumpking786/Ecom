const Joi = require("joi");
class LabelValidation {
  storeValidate = (data) => {
    try {
      let schema = Joi.object({
        title: Joi.string().required().min(2),
        link: Joi.string(),
        image: Joi.string(),
        type: Joi.string().valid("brand", "banner"),
        status: Joi.string().valid("active", "inactive").default("active"),
      });
      let response = schema.validate(data);
      if (response.error) {
        throw response.error.details[0].message;
      }
    } catch (err) {
      console.error("Validation error:", err.message);
      throw new Error(err.message);
    }
  };
}
module.exports = LabelValidation;
