const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const paymentIntent = require("./api/paymentIntent");
const decodeJWT = require("./auth/decodeJWT");
const validateUser = require("./auth/validateUser");
const updatePaymentIntent = require("./api/updatePaymentIntent");
const { wakeDyno } = require("heroku-keep-awake");
const webhook = require("./api/webhook");
const path = require("path");

const DYNO_URL = "https://massolit.herokuapp.com";
const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

app.use(cors({ origin: true }));

app.use(decodeJWT);

app.put("/update-payment-intent", validateUser, updatePaymentIntent);

app.post("/create-payment-intent", paymentIntent);

app.post("/webhook", webhook);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  wakeDyno(DYNO_URL);
});
