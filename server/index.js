const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const burgerModel = require("./models/burgerModel");
const burgersRoute = require("./routes/burgersRoute");
const usersRoute = require("./routes/usersRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use(express.json());
app.use(cors());

//burgerların route'unu çağırmak için kullanacağımız yapı
app.use("/api/burgers/", burgersRoute);
app.use("/api/users/", usersRoute);
app.use("/api/orders/", ordersRoute);

//serverı ayağa kaldırmak için
app.listen(4000, () => {
  console.log(
    "Food order serverı 4000 portunda başarıyla ayağa kalmaktadır 🔥🔥🔥"
  );
});
