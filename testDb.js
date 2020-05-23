module.exports.getCustomerSync = function (id) {
    console.log("Reading customer from MongoDB...");
    return { id, points: 11 };
}

module.exports.getCustomer = async function (id) {
    return new Promise((resolve, reject) => {
        console.log("Reading a customer from MongoDB asynchronously...");
        resolve({ id, points: 11 });
    });
}