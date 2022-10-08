import {getOperation, postOperation } from "../../controllers/operationController";
import connectMongo from "../../utils/connectMongo";
connectMongo();
export default async function handlerOperation(req,res) {
    if (req.method=="POST") {
        const opPosted =await postOperation(req.query.compteur, req.body);
        return res.status(201).json(opPosted);
    }else{
        const opGetten = await getOperation();
        return res.status(200).json(opGetten);
    }
}