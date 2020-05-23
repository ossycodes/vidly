const express = require("express");
const app = express();
const winston = require("winston");

//note that I put this first so just incase we got an error
//in loading other modules, we make sure we log that error
//and terminate the process.
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation");

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
    winston.info(`listening on port ${port}...`);
});

module.exports = server;