import { putUser } from "../../../controllers/userController";
import connectMongo from "../../../utils/connectMongo";

export default async function handlerUserUpdate(req,res) {
    
await connectMongo();
    if (req.method=="PUT") {
        console.log("***********************************************");
        
        const userUpdated= await putUser(req.query.compteur,req.body)
        return res.status(201).json(userUpdated)
    } else {
        
    }
}