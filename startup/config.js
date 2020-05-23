const config = require("config");

function configuration() {
    if (!config.get("jwtPrivateKey")) {
        //always throw an error object, as the stack trace will always be available 
        //for you to see later huh.
        throw new Error('FATAl ERROR: jwtPrivateKey is not defined');
    }
}

module.exports = configuration;
