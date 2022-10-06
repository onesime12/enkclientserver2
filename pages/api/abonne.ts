import { createAbonne, getAbonner } from "../../controllers/abonneController";
import connectMongo from "../../utils/connectMongo";
connectMongo();
export default async function handler(req, res) {
  if (req.method == "POST") {
    var a = await createAbonne(req.body);
    return res.json(a);
  } else {
    const b = await getAbonner();
    return res.json(b);
  }
}
