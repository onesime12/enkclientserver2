import { getCode, postCode } from "../../controllers/codeController";
import Code from "../../models/generateurModel";
import connectMongo from "../../utils/connectMongo";
import NextCors from "nextjs-cors";

connectMongo();
export default async function handlerCode(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method == "POST") {
    console.log(req.body);

    const codePosted = await postCode(req.body);
    return res.status(201).json(codePosted);
  } else {
    const codeFind = await Code.find();
    return res.status(200).json(codeFind);
  }
}
