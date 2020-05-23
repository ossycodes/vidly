const db = require("./testDb");
const mail = require("./testEmail");

//testing numbers
module.exports.absolute = function (number) {
    return (number >= 0) ? number : -number;
}

//testing strings
module.exports.greet = function (name) {
    return `Welcome ${name}`;
}

//testing arrays
module.exports.getCurrencies = function () {
    return ["USD", "AUD", "NGN"];
}

//testing objects
module.exports.getProduct = function (productId) {
    return { id: productId, price: 10, category: "food" };
}

//testing exception
module.exports.registerUser = function (username) {
    if (!username) throw new Error("Username is required.");

    return { id: new Date().getTime(), username };
}

//mock functions
module.exports.applyDiscount = function (order) {
    const customer = db.getCustomerSync(order.customerId);

    if (customer.points > 10) {
        order.totalPrice *= 0.9;
    }
}

module.exports.notifyCustomer = function (order) {
    const customer = db.getCustomerSync(order.customerId);

    mail.send(customer.email, "Your order was placed successfully");
}