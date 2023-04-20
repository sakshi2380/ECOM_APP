const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//import route
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
const order = require("./routes/orderRoute");

const app = express();
app.use(express.json());

//Middleware for error
app.use(errorMiddleware);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());


// app.use('/api',product)

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

module.exports = app;

