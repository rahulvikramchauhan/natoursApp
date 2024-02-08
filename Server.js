const dotenv = require("dotenv");
const app = require("./practiceExpress");
const mongoose = require("mongoose");
const { newTour } = require("./Database/mongodb");
dotenv.config({ path: "./config.env" });

(async function () {
  const data = await newTour.save();
  console.log(data);
})();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING + "NewNatours_app")
  .then(function () {
    console.log("connected to mongodb");
    app.listen(3000, function () {
      console.log("server is listening...");
    });
  })
  .catch(function (err) {
    console.log(err);
  });
