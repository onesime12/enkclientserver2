import {
  getOperation,
  postOperation,
} from "../../controllers/operationController";
import connectMongo from "../../utils/connectMongo";
import NextCors from "nextjs-cors";
connectMongo();
export default async function handlerOperation(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method == "POST") {
    console.log(req.body);

    const opPosted = await postOperation(req.body);
    return res.status(201).json(opPosted);
  } else {
    const opGetten = await getOperation();
    return res.status(200).json(opGetten);
  }
}
