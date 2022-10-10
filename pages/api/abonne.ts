import { getAbonnes, postAbonne } from "../../controllers/abonneController";
import connectMongo from "../../utils/connectMongo";
connectMongo();
export default async function handler(req, res) {
  if (req.method == "POST") {
    var abonnePosted = await postAbonne(req.body);
    return res.status(201).json(abonnePosted);
  } else {
    const abonneGetten = await getAbonnes();
    return res.status(200).json(abonneGetten);
  }
}
