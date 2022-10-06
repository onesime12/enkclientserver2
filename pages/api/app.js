//init code
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const database = require("../../my_database");
const userController = require("../../controllers/userController");
const operationController = require("../../controllers/operationController");
const abonneController = require("../../controllers/abonneController");

//middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", userController);
app.use("/api", operationController);
app.use("/api/", abonneController);

//default route
app.all("/", (req, res) => {
  return res.json({
    statusbar: true,
    MessagePort: "welcome to all",
  });
});

//start server
app.listen(port, function () {
  console.log("sever is running at port : " + port);
});
