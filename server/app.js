const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('./db/conn');
const cookieParser = require("cookie-parser");
// const User = require("./model/schema");

const app = express();
app.use(cookieParser());
// We are linking the Router Files to make Routing easy
app.use(express.json());
app.use(require('./router/auth'));

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

// app.get('/about', middleware, (req, res) => {
//     res.send("Hello from the About Page");
// });

// app.get('/contact', (req, res) => {
//     res.send("Hello from the Contact Page");
// });

// app.get('/login', (req, res) => {
//     res.send("Hello from the Login Page");
// });

app.get('/registeration', (req, res) => {
    res.send("Hello from the Register Page");
});

app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
})
