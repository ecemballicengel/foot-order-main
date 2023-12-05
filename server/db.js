const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://ecem:98765@foodordercluster.ynrl0lg.mongodb.net/food-order?retryWrites=true&w=majority"
);

//connection'on açık veya kapalı iki farklı opsiyon verdiğimiz haliyle veritabanını dinleyen metot.
var db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongo DB Baglantisi Basarili");
});
//Yorum
db.on("error", () => {
  console.log("Mongo DB Baglantisi Hatali");
});

module.exports = mongoose;
