const express = require("express");
const usersModel = require("../models/usersModel");
const router = express.Router();

//Register endpointini yazalim
router.post("/register", async (req, res) => {
  const { name, mail, password } = req.body;

  const oldUser = await usersModel.findOne({ mail: mail });
  if (oldUser) {
    res.status(400).json({ message: "Böyle bir kullanıcı bulunmaktadır." });
  } else {
    const newUser = new usersModel({
      name: name,
      mail: mail,
      password: password,
    });
    try {
      await newUser.save();
      res.send(newUser);
    } catch (error) {
      res.send(error);
    }
  }
});

//login endpointi mongonun find
router.post("/login", async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await usersModel.find({ mail: mail, password: password });
    if (user.length > 0) {
      res.send(user[0]);
    } else {
      res
        .status(400)
        .json({ message: "Girilen bilgilerde kullanici bulunmamaktadır." });
    }
    // const user = await userModel.findOne({mail:mail, password:password});
    // if(user){
    //     res.send(user)
    // }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//getAllUser
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: "hata", error });
  }
});

//kullanici silme
router.post("/deleteUser", async (req, res) => {
  const userid = req.body.userid;
  // const {userid} = req.body

  try {
    await usersModel.findOneAndDelete({ _id: userid });
    res.send("Kullanici silme basarili");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
module.exports = router;
