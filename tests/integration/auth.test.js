const { Genre } = require('../../models/genre');
const User = require("../../models/users");
const request = require("supertest");
let server;
const jwt = require('jsonwebtoken');
const config = require('config');

describe('Auth Middleware', () => {
    beforeEach(() => {
        server = require('../../app');
    });
    afterEach(async () => {
        await server.close();
    });
    it('should verify wrong token', async () => {
        //Work with Genre for example

        const res = await request(server).post('/api/genres')
            .set('x-auth-token', 'NOT A TOKEN!!!')
            .send({ name: "genre1" });
        expect(res.status).toBe(400);
    });
    it('should verify the Empty string token', async () => {
        //Work with Genre for example
        const res = await request(server).post('/api/genres')
            .set('x-auth-token', "")
            .send({ name: "genre1" });
        expect(res.status).toBe(401);
    });
    it('should verify the Right token', async () => {
        //Work with Genre for example
        const user = new User();
        const payload = { _id: user._id };
        const token = jwt.sign(payload, "1234");
        const res = await request(server).post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: "genre1" });

        expect(res.status).toBe(200);
    });
});
