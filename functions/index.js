/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
/* eslint-disable max-len, comma-dangle, indent, object-curly-spacing */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Pi7PGRsyEjxVCg1PwKZzOamE8gppbGqa8uIYeSRC7EbuddfWRuAT9JK1Bq4l1x5LWcUSez1OtkApeSABXNYUWun00pWe5oHf8"
);

// API

// App config
const app = express();
// express is a minimal and flexible Node.js web application framework that provides
// a robust set of features for web and mobile applications. we are initializing the app here

// Middlewares
// CORS: Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers
// to tell browsers to give a web application running at one origin, access to selected
// resources from a different origin.A
app.use(cors({origin: true})); // cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

// creates a new paymentIntent, through a post endpoint that takes in the total amount of the payment
app.post("/payments/create", async (request, response) => {
  const total = Math.round(request.query.total); // this is the total amount of the payment

  logger.info("Payment Request of: ", total, " Recieved!");
  console.log("Payment Request of: ", total, " Recieved!");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "cad", // currency code
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = onRequest(app); // this exports the express app as a firebase HTTPS (cloud) function
// functions.https.onRequest(app): Wraps the Express app to handle HTTPS requests in Firebase.

// example endpoint

// http://127.0.0.1:5001/clone-9bfce/us-central1/api

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
/* eslint-enable max-len, comma-dangle, indent, object-curly-spacing */
