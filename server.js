const express = require("express");
const app = express();
var cors = require("cors");

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
    "sk_test_51LZThuJyDRgsgtRA3iz5HcMLGPRfJvMFBj1oSZsXY1RxAYPywCPsGzJKq99rHFu2uM3Oj8r7bQRisJmYKhzTqVZi00t7lWupTH"
);

app.use(express.static("public"));
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
