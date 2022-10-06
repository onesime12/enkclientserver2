// code init
require("dotenv").config();
const mongoose = require("mongoose");
const assert = require("assert");
const db_url = process.env.DB_URL_CLOUD;

//connection to database
mongoose.connect(db_url, function (err, link) {
  //check error
  assert.equal(err, null, "DB Connect fail...");

  //ok
  console.log("database connect success...");
});
