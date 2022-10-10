import { getAbonnes, postAbonne } from "../../controllers/abonneController";
import connectMongo from "../../utils/connectMongo";
import NextCors from "nextjs-cors";
connectMongo();
export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method == "POST") {
    var abonnePosted = await postAbonne(req.body);
    return res.status(201).json(abonnePosted);
  } else {
    const abonneGetten = await getAbonnes();
    return res.status(200).json(abonneGetten);
  }
}
