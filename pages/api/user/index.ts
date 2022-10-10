import { getUser, postUser } from "../../../controllers/userController";
import Abonne from "../../../models/abonneModele";
import User from "../../../models/userModel";
import connectMongo from "../../../utils/connectMongo";
import { hashedPassword } from "../../../utils/motDepasse";
connectMongo();
export default async function handelerUser(req, res) {
  if (req.method == "POST") {
    // console.log(req.body);

    // const userPosted = await postUser(req.body);
    // return res.status(201).json(userPosted);

    try {
      const { userName, compteur, password } = req.body;
      const abonneFind = await Abonne.findOne({ compteurNumber: compteur });
      console.log(abonneFind);

      const wordPassWord = await hashedPassword(password);
      const newUser = await User.create({
        userName: userName,
        compteurNumber: abonneFind.compteurNumber,
        password: wordPassWord,
        abonneId: abonneFind._id,
      });
      console.log(newUser);

      res.status(201).json(newUser);
    } catch (e) {
      res.status(500).json(e);
    }
  } else if (req.method == "GET") {
    const userGetten = await getUser();
    return res.status(200).json(userGetten);
  } else {
  }
}
