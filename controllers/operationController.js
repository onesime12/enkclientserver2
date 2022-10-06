const router = require("express").Router();
const axios = require("axios").default;
const bodyParser = require("body-parser");
const { response } = require("express");
const operation = require("../models/operationModel");
const User = require("../models/userModel");
const user = require("../models/userModel");

//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//create operation
router.post("/operation", async (req, res) => {
  try {
    const userFind = await user.findOne({ compteurNumber: req.body.compteur });
    if (!userFind) {
      return res.json({
        status: false,
        message: "user not found",
      });
    }
    const newOperation = await operation.create({
      operateur: userFind.userName,
      compteurNumber: userFind.compteurNumber,
      prix: req.body.prix,
      userId: userFind._id,
    });
    if (!newOperation) {
      return res.status(400).json({
        status: false,
        message: "fail to post an operation...",
      });
    }
    await user.findOneAndUpdate(
      { compteurNumber: req.body.compteur },
      {balance: userFind.balance-req.body.prix},
      {new:true}
    )
    axios
      .post("http://localhost:8081/api/code", {
        userName: userFind.userName,
        prix: req.body.prix,
        numCompteur: userFind.compteurNumber,
        userId: userFind._id,
      })
      .then((response) => {
        const codeEnreg = response.data;
        console.log(codeEnreg);
      });
    return res.status(200).json({
      status: true,
      message: "Success posting an operation...",
      newOperation,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/operation", async (req, res) => {
  try {
    const operationFound = await operation.find({});
    if (!operationFound) {
      res.status(400).json({
        message: "operations not found ...",
      });
    }
    return res.status(200).json(operationFound);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = router;
