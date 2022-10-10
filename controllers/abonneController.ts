import bodyParser from "body-parser";
import Abonne from "../models/abonneModele";
import express from "express";
const router = express.Router();
//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//endPoint for posting Abonné
export const postAbonne = async (data) => {
  console.log(data);

  try {
    const newAbonne = await Abonne.create({
      aboName: data.aboName,
      compteurNumber: data.compteurNumber,
      quartier: data.quartier,
      cellule: data.cellule,
      numParcelle: data.numParcelle,
      typeAbonnement: data.type,
    });
    console.log(newAbonne);

    return newAbonne;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Api for getting Abonné
export const getAbonnes = async () => {
  try {
    const abonnesFound = await Abonne.find({});
    console.log(abonnesFound);
    return abonnesFound;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putAbonne = async (compteur, data) => {
  try {
    const abonneFind = await Abonne.findOneAndUpdate(
      {
        compteurNumber: compteur,
      },
      {
        aboName: data.abonnement,
        compteurNumber: data.compteur,
        quartier: data.quartier,
        cellule: data.cellule,
        numParcelle: data.parcelle,
        typeAbonnement: data.type,
      },
      { new: true }
    );
    if (!abonneFind) {
      return {
        status: false,
        message: "abonné not updated...",
      };
    }
    return abonneFind;
  } catch (error) {
    return error;
  }
};

export default router;
