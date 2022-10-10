import { getCode, postCode } from "../../controllers/codeController";
import Code from "../../models/generateurModel";
import connectMongo from "../../utils/connectMongo";

connectMongo();
export default async function handlerCode(req, res) {
  if (req.method == "POST") {
    console.log(req.body);

    const codePosted = await postCode(req.body);
    return res.status(201).json(codePosted);
  } else {
    const codeFind = await Code.find();
    return res.status(200).json(codeFind);
  }
}
