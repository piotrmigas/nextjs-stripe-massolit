const stripeAPI = require("../stripe");
const firebase = require("../firebase");

const webHookHandlers = {
  "payment_intent.succeeded": (data) => {
    firebase.db
      .collection("users")
      .doc(data.metadata.uid)
      .collection("orders")
      .doc(data.id)
      .set({
        amount: data.amount / 100,
        pickupDate: data.metadata.pickupDate,
        products: data.metadata.products,
        shipping: data.shipping.address.line1,
        phone: data.shipping.phone,
        createdAt: firebase.timestamp,
      });
  },
  "payment_intent.payment_failed": (data) => {
    console.log("Payment Failed", data);
  },
};

function webhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(req["rawBody"], sig, process.env.WEB_HOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook error ${error.message}`);
  }

  if (webHookHandlers[event.type]) {
    webHookHandlers[event.type](event.data.object);
  }
}

module.exports = webhook;
