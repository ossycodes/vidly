const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.generateToken", () => {
    it("should return a valid J.W.T ", () => {
        const payload = {
            _id: new mongoose.Types.ObjectId(),
            isAdmin: true,
        }
        const user = new User(payload);
        const token = user.generateToken();
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject({
            _id: payload._id.toHexString(),
            isAdmin: true
        });
    });
});