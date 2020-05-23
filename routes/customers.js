const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Customer, validate } = require("../models/customer");
const jwtAuth = require("../middleware/auth");

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort("name");

    res.status(200).send(customers);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    const customer = await Customer.findById(id);

    if (!customer) {
        return res.status(404).send("The customer with the given id does not exist");
    }

    res.send(customer);
});

router.post('/', jwtAuth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    res.status(201).send(customer);
});

router.put('/:id', jwtAuth, async (req, res) => {
    const id = req.params.id;

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let customer = Customer.findById(id);


    if (!customer) {
        return res.status(404).send("The customer with the given ID does not exist");
    }

    customer.name = req.body.name;
    customer.phone = req.body.phone;
    customer.isGold = req.body.isGold;

    customer.save();

    res.status(200).send(customer);

});

router.delete("/:id", jwtAuth, async (req, res) => {
    const id = req.params.id;

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    let customer = await Customer.findById(id);

    if (!customer) {
        return res.status(404).send("The customer ID is invalid");
    }

    res.status(200).send(customer);
});

module.exports = router;