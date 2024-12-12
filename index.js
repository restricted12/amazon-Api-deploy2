
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// GET route for testing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// POST route for payment creation
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      console.log("Payment Intent created:", paymentIntent);
      res.status(201).json({
        clinet_secret : paymentIntent.client_secret
      });
    } catch (error) {
      console.error("Error creating Payment Intent:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});
app.listen(4800,(err)=>{
    if (err) throw err
    console.log("amazone server running on port:4800")

})
// Export the API

