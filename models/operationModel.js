// init code
const mongoose = require("mongoose");

//user schema
const operationSchema = mongoose.Schema({
  operateur: {
    type: String,
    required: true,
  },
  compteurNumber: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//user model
const Operation = mongoose.model("Operation", operationSchema, "operations");
//module exports
module.exports = Operation;
