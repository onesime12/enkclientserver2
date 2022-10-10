import Operation from "../models/operationModel";
import User from "../models/userModel";
import Axios from "axios";
import Code from "../models/generateurModel";
import generateCode from "../utils/generateurCode";

//create operation
export const postOperation = async (data) => {
  try {
    console.log(data);

    const userFind = await User.findOne({ compteurNumber: `${data.compteur}` });
    if (!userFind) {
      const message = "user not found with this compter number...";
      return message;
    } else if (userFind.balance < data.prix) {
      const message = "Your count Balance is low for this operation...";
      return message;
    }
    const price = parseFloat(data.prix);
    const newOperation = await Operation.create({
      operateur: userFind.userName,
      compteurNumber: userFind.compteurNumber,
      prix: price,
      userId: userFind._id,
    });
    console.log("*");

    if (!newOperation) {
      const message = "impossible de passer cette operation...";
      return message;
    }
    console.log("**");
    const newCode = await Code.create({
      userName: userFind.userName,
      prix: price,
      code: generateCode(20),
      numCompteur: userFind.compteurNumber,
      operationId: newOperation._id,
    });
    console.log("***");
    const userBalanceUpdated = await User.updateOne(
      { compteurNumber: userFind.compteurNumber },
      { balance: userFind.balance - price },
      { new: true }
    );
    console.log("****");
    return { newOperation, newCode, userBalanceUpdated };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOperation = async () => {
  try {
    const operationsFound = await Operation.find({});
    return operationsFound;
  } catch (error) {
    return error;
  }
};
