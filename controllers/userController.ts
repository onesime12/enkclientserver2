import express from "express";
import bodyParser from "body-parser";
import User from "../models/userModel";
import Abonne from "../models/abonneModele";
import { hashedPassword } from "../utils/motDepasse";
const router = express.Router();
//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//creat new user document route
export const postUser = async (data) => {
  try {
    const abonneFind = await Abonne.findOne({ compteurNumber: data.compteur });
    console.log(abonneFind);

    const wordPassWord = await hashedPassword(data.password);
    const newUser = await User.create({
      userName: data.userName,
      compteurNumber: abonneFind.compteurNumber,
      password: wordPassWord,
      abonneId: abonneFind._id,
    });
    return newUser;
  } catch (error) {
    return new Error(error);
  }
};

//get all user document route
export const getUser = async () => {
  try {
    const userFinds = await User.find({});
    return userFinds;
  } catch (error) {
    return error;
  }
};

// update user document route
export const putUser = async (compteur, data) => {
  try {
    console.log(compteur);

    const userFind = await User.findOne({ compteurNumber: compteur });
    console.log(userFind);

    if (!userFind) {
      const userNoteFouond = "user not found for Updating...";
      return userNoteFouond;
    }
    console.log(userFind);

    const userUpdeted = await User.findByIdAndUpdate(
      userFind._id,
      { balance: userFind.balance + data.balance },
      { new: true }
    );
    if (userUpdeted) {
      const succesMessage = "succefully user updated ...";
      return [userUpdeted, succesMessage];
    }
  } catch (error) {}
};

export default router;
