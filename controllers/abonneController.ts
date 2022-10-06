import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import abonne from "../models/abonneModele";
const router = express.Router();
//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//endPoint for posting Abonné
export const createAbonne = async (data) => {
  try {
    const newAbonne = await abonne.create(data);
    return newAbonne;
  } catch (error) {
    return error;
  }
};

export const getAbonner = async () => {
  try {
    const abonnesFound = await axios.get(
      "https://enkserver.vercel.app/api/abonne"
    );

    // console.log(abonnesFound);
    if (abonnesFound.status != 200) {
      return {
        status: 400,
        message: "pas des abonnés Maintenant...",
      };
    }
    const ab = abonnesFound.data;
    return ab;
  } catch (error) {
    return error;
  }
};

//Api for getting Abonné
router.get("/abonne", async (req, res) => {});

router.put("/abonne", async (req, res) => {
  try {
    const abonneFind = await abonne.findOneAndUpdate(
      {
        compteurNumber: req.body.compteur,
      },
      {
        aboName: req.body.abonnement,
        compteurNumber: req.body.compteur,
        quartier: req.body.quartier,
        cellule: req.body.cellule,
        numParcelle: req.body.parcelle,
        typeAbonnement: req.body.type,
      },
      { new: true }
    );
    if (!abonneFind) {
      return res.json({
        status: false,
        message: "abonné not updated...",
      });
    }
    return res.json(abonneFind);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
