const winston = require("winston");

function errorHandler(err, req, res, next) {
    //log levels
    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    // winston.log('error', err.message);
    winston.error(err.message, err);
    res.status(500).send('Something failed');
}

module.exports = errorHandler;