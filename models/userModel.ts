import mongoose from "mongoose";
//table utilisateur
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  compteurNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  isActived: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  abonneId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Abonne",
    require: true,
  },
});
// creation du modele et son exportation
const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
export default User;
