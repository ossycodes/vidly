
const mongoose = require("mongoose");
const Joi = require("Joi");

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true,
        minlength: 11,
        maxlength: 11
    }
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.number().min(11).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;