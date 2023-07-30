const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
    res.send("Hello from the Router Server");
});

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

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
                res.json({ message: "User signin successfully" });
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

module.exports = router;
