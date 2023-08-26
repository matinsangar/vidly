const Rental = require('../../models/rental');
const { Member } = require('../../models/members');
const mongoose = require('mongoose');
const request = require('supertest');
describe('/api/returns', () => {
    let server;
    let memberId;
    memberId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    beforeEach(async () => {
        server = require("../../app");
        const rental = new Rental({
            member: {
                _id: memberId,
                name: '12345',
                phone: '12345',
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });
        await rental.save();
    });

    // Setup step that runs after each test case in the test suite
    afterEach(async () => {
        await server.close();
        await Rental.deleteMany();
    });

    it('should return 401 if user is not logged in', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ memberId: memberId, movieId: movieId });
        expect(res.status).toBe(401);
    });
    it('should return 400 if memberId is not provided', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ movieId: movieId });
        expect(res.status).toBe(400);
    });

});