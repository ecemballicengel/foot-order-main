const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51OBCX1Gg5oQ5MXqVA400kjMPoTt36aYIeUbuFR5Pz14gw6hLIgPgfndtUxbpojhUUjVwGeTPK3p1csnKrfBwDzsK00ftUzVcZ2"
);

const { v4: uuid } = require("uuid");
const cors = require("cors");
const orderModel = require("../models/orderModel");
const app = express();

app.use(cors());

router.post("/checkoutOrder", async (req, res) => {
  const { token, toplamfiyat, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: toplamfiyat * 100,
        currency: "TRY",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuid(),
      }
    );

    if (payment) {
      const newOrder = new orderModel({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: toplamfiyat,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zipCode: token.card.address_zip,
        },
        transactionId: payment.source_id,
      });

      newOrder.save();
      res.send("Ödeme başarili");
    } else {
      res.send("Bir şeyler ters gitti");
    }
  } catch (error) {
    res.status(400).json({ message: "Ödeme başarisiz", error });
  }
});

router.post("/getOrdersByUser", async (req, res) => {
  const { userid } = req.body;

  try {
    const orders = await orderModel.find({ userid: userid });
    res.send(orders);
  } catch (error) {
    res.status(400).json({ message: "Siparişlere Erişilemiyor", error });
  }
});

//get all orders
router.get("/getAllOrders", async (req, res) => {
  const orders = await orderModel.find();
  res.json(orders);
});

module.exports = router;
