//init code
const mongoose = require("mongoose");

const abonneSchema = mongoose.Schema({
  aboName: {
    type: String,
    required: true,
  },
  compteurNumber: {
    type: String,
    required: true,
    unique: true,
  },
  quartier: {
    type: String,
    require: true,
  },
  cellule: {
    type: String,
    required: true,
  },
  numParcelle: {
    type: Number,
    required: true,
  },
  typeAbonnement: {
    type: String,
    require: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const Abonne = mongoose.model("Abonne", abonneSchema, "abonnes");
module.exports = Abonne;
