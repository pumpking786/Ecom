const slugify = require("slugify");
const Joi = require("joi");
const LabelValidation = require("../../validation/Label.validation");
const LabelModel = require("../model/label.model");
class LabelService {
  constructor() {
    this.labelValidation = new LabelValidation();
  }
  createLabel = async (data) => {
    try {
      this.labelValidation.storeValidate(data);
      const label_obj = new LabelModel(data);
      return await label_obj.save();
    } catch (err) {
      console.log("LabelStore: ", err);
      throw new Error(err.message);
    }
  };
}
module.exports = LabelService;
