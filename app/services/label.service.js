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
  updateLabel = async (id, data) => {
    try {
      this.labelValidation.storeValidate(data);
      const label_obj = await LabelModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!label_obj) {
        throw new Error("Label not found");
      }
      return label_obj;
    } catch (err) {
      console.log("LabelStore: ", err);
      throw new Error(err.message);
    }
  };
  deleteLabel = async (id) => {
    try {
      const label_obj = await LabelModel.findByIdAndDelete(id);
      if (!label_obj) {
        throw new Error("Label Not Found");
      }
      return label_obj;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  getLabel = async (id) => {
    try {
      const label_obj = await LabelModel.findById(id);
      if (!label_obj) {
        throw new Error("Label Not Found");
      }
      return label_obj;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
module.exports = LabelService;
