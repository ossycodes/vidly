const express = require("express");
const router = express.Router();
const { Genre } = require("../models/genre");
const { Movie, validate } = require("../models/movies");
const jwtAuth = require("../middleware/auth");

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort("name");
    res.status(200).send(movies);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIdValid) {
        return res.status(400).send("Invalid ID");
    }

    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).send("The movie with the given id does not exist");
    }

    res.send(movie);
});

router.post('/', jwtAuth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);

    if (!genre) {
        return res.status(400).send(error.details[0].message);
    }

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();

    res.status(201).send(movie);
});

router.put('/:id', jwtAuth, async (req, res) => {

    const { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }

    movie.title = req.body.title;
    movie.genre.name = req.body.genre;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;

    movie = await movie.save();

    res.status(200).send(movie);

});

module.exports = router;