function isAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(403).send("Forbidden");
    }
    next();
}

// exports isAdmin as a function 
//can be accessed as:
//const isAdmin = require("admin");
module.exports = isAdmin;

//exports isAdmin as a property of the module.exports object
//can be accessed as:
//const { isAdmin } = require("admin");
// exports.isAdmin = isAdmin