import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import Abonne from "../models/abonneModele";
const router = express.Router();
//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//endPoint for posting Abonné
export const createAbonne = async (data) => {
  try {
    const newAbonne = await Abonne.create(data);
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

export const getAbonnes= async ()=>{
  try {
    const abonnesFounds=await Abonne.find({});
    return abonnesFounds;
  } catch (error) {
    return error
  }
}

export default router;
