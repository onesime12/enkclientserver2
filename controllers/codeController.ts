import express from "express";
import Code from "../models/generateurModel";
import generateCode from "../utils/generateurCode";
const router = express.Router();
//middleware goes here
router.use(express.json());

export const postCode = async (data) => {
  try {
    const newCode = await Code.create({
      userName: data.username,
      prix: data.prix,
      code: generateCode(20),
      numCompteur: data.numCompteur,
      operationId: data.operationId,
    });
    if (!newCode) {
      const errorMessage = "Fail while Creating compter number code...";
      return errorMessage;
    }
    return newCode;
  } catch (error) {
    return error;
  }
};

export const getCode = async () => {
  try {
    const codeFind = await Code.find();
    if (!codeFind) {
      const errorMessage = "Fail while getting compter numbers codes...";
      return errorMessage;
    }
    return codeFind;
  } catch (error) {
    return new Error(error);
  }
};

export default router;
