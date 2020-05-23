const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isAdmin: Boolean
});

// assign the generateToken function to the "methods" object of our userSchema
userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;;