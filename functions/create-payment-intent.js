require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_kEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, totalPrice, shippingFee } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shippingFee + totalPrice;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "create payment intent",
  };
};
