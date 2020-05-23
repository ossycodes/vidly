const bcrypt = require("bcrypt");

async function testBcrypt() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password", salt);
    console.log(hashedPassword);
    const isValid = await bcrypt.compare("passwod", hashedPassword);
    console.log(isValid);
}

testBcrypt();
