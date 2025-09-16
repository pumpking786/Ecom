const mongoose = require("mongoose");
const { trigger, statusSchema, created_by } = require("./commom.schema");
const { string, required } = require("joi");
const LabelSchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: String,
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["brand", "banner"],
      default: "banner",
    },
    status: statusSchema,
    created_by: created_by,
  },
  trigger
);
const LabelModel = mongoose.model("Label", LabelSchemaDef);
module.exports = LabelModel;
