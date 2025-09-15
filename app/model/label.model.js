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
    status: statusSchema,
    type: {
      type: String,
      enum: ["brand", "banner"],
      default: "banner",
    },
    created_by: created_by,
  },
  trigger
);
const LabelModel = mongoose.model("Label", LabelSchemaDef);
module.exports = LabelModel;
