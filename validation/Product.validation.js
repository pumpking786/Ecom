const Joi = require("joi");

class ProductValidation {
  storeValidate = (data) => {
    try {
      let schema = Joi.object({
        name: Joi.string().required().min(2),
        slug: Joi.string(),
        images: Joi.array()
          .items(Joi.string().allow(null).allow(""))
          .default([]),
        description: Joi.string().allow(null, ""),
        price: Joi.number().required().min(1),
        actual_price: Joi.number().required().min(1),
        discount: Joi.number().allow(null, "").min(0).max(100),
        category_id: Joi.array()
          .items(Joi.string().allow(null).allow(""))
          .default([]),
        brand: Joi.string().allow(null, "").default(null),
        seller: Joi.string().allow(null, ""),
        is_featured: Joi.boolean().default(false),
        status: Joi.string().valid("active", "inactive").default("active"),
        created_by: Joi.string(), // Add created_by as required ObjectId string
      });
      const { error, value } = schema.validate(data, { abortEarly: false }); // Correct options object
      if (error) {
        const errorMessages = error.details
          .map((detail) => detail.message)
          .join(", ");
        throw new Error(
          errorMessages || "Validation failed with unknown error"
        );
      }
      return value; // Return validated data
    } catch (err) {
      console.error("Validation error details:", err.message, err.stack); // Log stack for debugging
      throw new Error(err.message || "Validation error occurred");
    }
  };
}

module.exports = ProductValidation;
