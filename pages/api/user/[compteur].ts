import { putUser } from "../../../controllers/userController";
import User from "../../../models/userModel";
import connectMongo from "../../../utils/connectMongo";
import NextCors from "nextjs-cors";



export default async function handlerUserUpdate(req, res) {
  await connectMongo();

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method == "PUT") {
    const {compteur}=req.query;
        const {somme}=req.body;

        try {
            console.log(compteur);
            
            const userFind =await User.findOne({compteurNumber:compteur});
            console.log(userFind);
            
            if(!userFind){
              const userNoteFouond = "user not found for Updating...";
              return res.status(404).send({code:404,message:userNoteFouond});
            }
            console.log(userFind);
            
            const userUpdeted=await User.findByIdAndUpdate(
              userFind._id,
              {balance:userFind.balance+somme},
              {new:true}
            );
            if(userUpdeted){
              const succesMessage = "succefully user updated ..."
              return res.status(201).json({userUpdeted, succesMessage})
              //return []
            };
          } catch (error) {
            return res.status(500).send({code:500,message:"erreur inconnue"});
          }
  } else {
  }
}

