const mongoose = require("mongoose");
const NepalData = require("../../config/nepaldata");

const trigger = {
  autoCreate: true,
  autoIndex: true,
  timestamps: true,
};
const created_by = {
  type: mongoose.Types.ObjectId,
  ref: "User",
  default: null,
};
const AddressSchemaDef = new mongoose.Schema({
  state: {
    type: String,
    enum: NepalData.state,
  },
  district: {
    type: String,
    enum: NepalData.district,
  },
  municipality: {
    type: String,
    enum: NepalData.municipality,
  },
  location: String,
});
const statusSchema = {
  type: String,
  enum: ["active", "inactive"],
  default: "active",
};
module.exports = { trigger, created_by, AddressSchemaDef, statusSchema };
