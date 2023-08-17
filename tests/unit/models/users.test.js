const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');
const SecretKey = config.get('jwtPrivateKey');

describe('user.generateAuthToken', () => {
    it('should return a valid token', () => {
        const payload = ({ _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true });
        const user = new User(payload);

        const token = jwt.sign(payload, SecretKey);
        const decodeToken = jwt.verify(token, SecretKey);
        expect(decodeToken.isAdmin).toBe(user.isAdmin);
        expect(decodeToken._id).toBe(payload._id);
    });
});
