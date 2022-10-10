import { model, models, Schema, SchemaTypes } from "mongoose";
const codeUniteSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    required: true,
    default: false,
  },
  numCompteur: {
    type: String,
    required: true,
  },
  operationId: {
    type: SchemaTypes.ObjectId,
    ref: "Operation",
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const Code = models.Code || model("Code", codeUniteSchema, "codes");
export default Code;
