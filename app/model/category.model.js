const mongoose = require("mongoose");
const { trigger, statusSchema, created_by } = require("./commom.schema");
const { required } = require("joi");
const CategorySchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: String,
    //   type: String,
    //   enum: ["brand", "banner"],
    //   default: "banner",
    // },
    brands: [{ type: mongoose.Types.ObjectId, ref: "Label", default: null }], // type: {
    status: statusSchema,
    created_by: created_by,
  },
  trigger
);
const CategoryModel = mongoose.model("Category", CategorySchemaDef);
module.exports = CategoryModel;
