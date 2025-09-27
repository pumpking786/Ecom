const mongoose = require("mongoose");
const { statusSchema, trigger, created_by } = require("./commom.schema");
const { required } = require("joi");
const { Transaction } = require("mongodb");
const OrderSchemaDef = new mongoose.Schema(
  {
    buyer_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [
      {
        product_id: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        total_amt: {
          type: Number,
          required: true,
        },
      },
    ],
    sub_total: {
      type: Number,
      required: true,
    },
    discount: {
      discount_type: {
        type: String,
        enum: ["percent", "flat"],
        default: "percent",
      },
      amount: {
        type: Number,
      },
    },
    service_charge: Number,
    delivery_charge: {
      type: Number,
    },
    vat: { type: Number },
    total_amt: {
      type: Number,
    },
    order_date: { type: Date },

    status: {
      type: String,
      enum: ["pending", "verified", "processing", "cancelled", "delivered"],
      default: "pending",
    },
    is_paid: {
      paid: { type: Boolean, default: false },
      mode: { type: String, enum: ["online", "cod"], default: null },
      transaction: { type: String, default: null },
    },
    created_by: created_by,
  },
  trigger
);
const OrderModel = mongoose.model("Order", OrderSchemaDef);
module.exports = OrderModel;
