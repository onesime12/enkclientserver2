import express from "express";
import bodyParser from "body-parser";
import Operation from "../models/operationModel";
import User from "../models/userModel";
import Axios from "axios";
const router = express.Router();
//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//create operation
export const postOperation = async(compteur, data)=>{
  try {
    const userFind=await User.findOne({compteurNumber:compteur});
    if (!userFind) {
      const message = "user not found with this compter number...";
      return message;
    }else if(userFind.balance < data.prix){
      const message = "Your count Balance is low for this operation...";
      return message;
    }
    const newOperation = await Operation.create({
      operateur: userFind.userName,
      compteurNumber: userFind.compteurNumber,
      prix: data.prix,
      userId: userFind._id,
    });
    if(!newOperation){
      const message = "impossible de passer cette operation...";
      return message;
    }
    const newCode = await Axios.post("https://enkserver.vercel.app/api/code",{
        userName: userFind.userName,
        prix: data.prix,
        numCompteur: userFind.compteurNumber,
        operationId: newOperation._id,
    });

    const userBalanceUpdated = await User.updateOne(
      {compteurNumber:userFind.compteurNumber},
      {balance:userFind.balance-data.prix},
      {new:true}
    );
    return [newOperation, newCode, userBalanceUpdated]
  } catch (error) {
    return error
  }
}

export const getOperation = async ()=>{
  try {
    const operationsFound = await Operation.find({});
    return operationsFound
  } catch (error) {
    return error
  }
  
}

export default router;
