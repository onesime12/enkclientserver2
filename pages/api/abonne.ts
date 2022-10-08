import { createAbonne, getAbonner } from "../../controllers/abonneController";
import connectMongo from "../../utils/connectMongo";
connectMongo();
export default async function handler(req, res) {
  if (req.method == "POST") {
    var abonnePosted = await createAbonne(req.body);
    return res.status(201).json(abonnePosted);
  } else {
    const abonneGetten = await getAbonner();
    return res.status(200).json(abonneGetten);
  }
}
