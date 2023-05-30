const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const paymentIntent = require('./api/paymentIntent');
const decodeJWT = require('./auth/decodeJWT');
const validateUser = require('./auth/validateUser');
const updatePaymentIntent = require('./api/updatePaymentIntent');
const webhook = require('./api/webhook');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  express.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
  })
);

app.use(cors({ origin: true }));

app.use(decodeJWT);

app.put('/update-payment-intent', validateUser, updatePaymentIntent);

app.post('/create-payment-intent', paymentIntent);

app.post('/webhook', webhook);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
