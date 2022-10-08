import { getUser, postUser } from "../../../controllers/userController";
import connectMongo from "../../../utils/connectMongo";
connectMongo();
export default async function handelerUser(req, res) {
    if (req.method=="POST") {
        const userPosted=await postUser(req.query.compteur,req.body);
        return res.status(201).json(userPosted);
    } else if(req.method=="GET"){
        const userGetten = await getUser();
        return res.status(200).json(userGetten);
    } else {

    }
}