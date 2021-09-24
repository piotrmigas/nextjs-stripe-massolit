const stripeAPI = require("../stripe");

function calculateOrderAmount(cartItems) {
  const cookies = cartItems.filter((item) => item.category === "cookies");
  const otherItems = cartItems.filter((item) => item.category !== "cookies");

  let discount;

  const quantity = cookies.reduce((prev, cur) => prev + cur.quantity, 0);

  if (quantity > 0 && quantity <= 3) discount = 0;
  if (quantity > 3 && quantity <= 9) discount = 0.16;
  if (quantity > 9 && quantity <= 19) discount = 0.23;
  if (quantity > 19) discount = 0.33;
  const price = quantity * 3;
  const savings = price * discount;
  const totalCookies = Math.floor(price - savings);
  return (
    ((cookies.length ? totalCookies : 0) + otherItems.reduce((total, prod) => total + prod.price * prod.quantity, 0)) *
    100
  );
}

async function paymentIntent(req, res) {
  const { cartItems, receipt_email, shipping, metadata } = req.body;

  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "pln",
      payment_method_types: ["card"],
      receipt_email,
      shipping,
      metadata,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Wystąpił błąd, nie można utworzyć płatności" });
  }
}

module.exports = paymentIntent;
