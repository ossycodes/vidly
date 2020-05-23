const _ = require("lodash");
const Joi = require("Joi");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const { User } = require("../models/user");

router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("Invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
        return res.status(400).send("Invalid credentials.")
    }
    
    const token = user.generateToken();

    return res.status(200).send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router;