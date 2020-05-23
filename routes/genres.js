const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
const { Genre, validate } = require("../models/genre");
const jwtAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
   
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    const genre = await Genre.findById(id);

    if (!genre) {
        return res.status(404).send({
            status: "The genre with the given ID does not exist"
        });
    }

    res.send(genre);
});

router.post("/", jwtAuth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();

    res.status(201).send(genre);
});


router.put('/:id', jwtAuth, async (req, res) => {
    const id = req.params.id;

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(id, { name: req.body.name }, {
        new: true
    });

    if (!genre) {
        return res.status(404).send("The genre with the given ID does not exist");
    };

    res.status(200).send(genre);

});

router.delete('/:id', [jwtAuth, isAdmin], async (req, res) => {
    const id = req.params.id;

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    const genre = await Genre.findByIdAndRemove(id);

    if (!genre) {
        return res.status(404).send("The genre with the given ID does not exist");
    }

    res.send(genre);
});

module.exports = router;