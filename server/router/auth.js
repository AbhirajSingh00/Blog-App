const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authentication");

let token;
router.get('/', (req, res) => {
    res.send("Hello from the Router Server");
});

// Register Route
router.post('/register', async (req, res) => {
    const { name, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ message: "Please fill all the fields" });
    }
    try {

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ message: "User already exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password does not match" })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "User registered successfully" })
        }
    } catch (err) {
        console.log(err)
    };

});

// Login Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const match = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();

            // Storing JWT in  Cookie 
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (match) {
                res.status(201).json({ message: "User signin successfully" });
            }
            else {
                res.status(400).json({ error: "Sigin error" });
            }
        }
        else {
            res.status(400).json({ error: "Sigin error" });
        }
    } catch (err) {
        console.log(err);
    };
});

// About Us Page
router.get("/about", Authenticate, (req, res) => {
    console.log("About");
    res.send(req.rootUser);
});

// Getting User Data for Contact and Home Page
router.get("/getdata", Authenticate, (req, res) => {
    console.log("Contact and Home");
    res.send(req.rootUser);
});

// Contact Page
router.post('/contact', Authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: "Please fill the contact form" })
        }
        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "Contact Added Successfully" });

        }



    } catch (e) {
        console.log(e);
    }

});

// Logout Page
router.get("/logout", Authenticate, (req, res) => {
    console.log("User Logout");
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logout");
});

module.exports = router;
