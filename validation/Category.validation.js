const Joi = require("joi");
class CategoryValidation {
  storeValidate = (data) => {
    try {
      let schema = Joi.object({
        name: Joi.string().required().min(2),
        slug: Joi.string(),
        image: Joi.string(),
        parent_id: Joi.string().allow(null, "").empty().default(null),
        brands: Joi.string().empty().default(null),
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
module.exports = CategoryValidation;
