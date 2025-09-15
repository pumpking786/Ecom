const { required, string } = require("joi");
const mongoose = require("mongoose");
const { created_by, trigger } = require("./commom.schema");

const UserSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "seller"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    address: {
      type: String,
      default: null,
    },
    // address: {
    //   shipping: AddressSchemaDef,
    //   billing: AddressSchemaDef,
    // },
    image: {
      type: String,
      default: null,
    },
    created_by: created_by,
  },
  trigger
);
const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;
