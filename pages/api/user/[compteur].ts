import { putUser } from "../../../controllers/userController";
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
    console.log("***********************************************");

    const userUpdated = await putUser(req.query.compteur, req.body);
    return res.status(201).json(userUpdated);
  } else {
  }
}
