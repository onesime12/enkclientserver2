import { putUser } from "../../../controllers/userController";
import User from "../../../models/userModel";
import connectMongo from "../../../utils/connectMongo";

export default async function handlerUserUpdate(req,res) {
    
await connectMongo();
    if (req.method=="PUT") {
        console.log("***********************************************");
        
        // const userUpdated= await putUser(req.query.compteur,req.body)
        // if(userUpdated?.code==404){
        //     return res.status(404)
        // }
        // return res.status(201).json(userUpdated)
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