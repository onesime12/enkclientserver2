const router = require("express").Router();
const bodyParser = require("body-parser");
const user = require("../models/userModel");
const abonne = require("../models/abonneModele");
const { hashedPassword } = require("../utils/hashPassword");

//middleware goes here
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//default route
router.all("/", (req, res) => {
  return res.json({
    status: true,
    message: "user controller is working...",
  });
});

//creat new user route
router.post("/user", async (req, res) => {
  try {
    const hashedPwd = await hashedPassword(req.body.password);
    
    const abonneFind = await abonne.findOne({
      compteurNumber: req.body.compteur,
    });
    console.log(abonneFind);
    if (!abonneFind) {
      return res.status(400).json({
        status: false,
        message: "Abonné not found...",
      });
    }
    const newUser = await user.create({
      userName: req.body.username,
      compteurNumber: abonneFind.compteurNumber,
      password: hashedPwd,
      abonneId: abonneFind._id,
    });
    return res.status(200).json({
      newUser,
      status: true,
      message: "Sucess account created...",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Echec d'enregistrement...",
    });
  }
});

// find user documents route
router.get("/users", async (req, res) => {
  //find user document
  try {
    const allUsers = await user.find();
    if (!allUsers) {
      return res.json({
        status: false,
        message: "user not found",
      });
    }
    return res.json({
      status:true,
      message:"You have getten all users...",
      allUsers
    });
  } catch (error) {
    return res.json(error);
  }
});

// find user by email
router.get("/user", async (req, res) => {
  try {
    const userFind = await user.findOne(
      { compteurNumber: req.body.compteur },
      { password: 0 }
    );
    if (!userFind) {
      return res.json({
        status: false,
        message: "user not found",
      });
    }
    return res.json(userFind);
  } catch (error) {
    return res.json(error);
  }
});

//Update user document
router.put("/user/:compteur", async (req, res) => {
 const compteurNumber=req.params.compteur;
  try {
    const findUser=await user.findOne(
     { compteurNumber});
    if (!findUser) {
      return res.status(404).json({
        status:false,
        message:"user not found..."
      })
    }
    const findUserUpdated=await user.findOneAndUpdate(
      {_id:findUser._id},
      {balance:findUser.balance+ Number(req.body.somme)},
      {new:true}
    );
    return res.status(201).json({
      status:true,
      message:"Succes updating user...",
      user:findUserUpdated
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//remove user docement
router.delete("/user/:compteur", async (req, res) => {
  try {
    const userDelete = await user.findOneAndRemove({ compteurNumber: req.params.compteur });
    if (!userDelete) {
      return res.json({
        status: false,
        message: "Cet utilisateur n'est pas retrouvé pour être supprimé...",
      });
    }
    return res.status(200).json({
      status:true,
      message:"Cet utilisateur a été supprimé avec succès..."
    });
  } catch (error) {
    return res.status(400).json();
  }
});

//module export
module.exports = router;
