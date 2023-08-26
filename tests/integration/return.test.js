const Rental = require('../../models/rental');
const {Member} = require('../../models/members');
const mongoose = require('mongoose');
const request = require('supertest');
describe('/api/returns', () => {
    let server;
    let customerId;
    beforeEach(async () => {
        server = require("../../app");
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        const rental = new Rental({
            customer: {
                _id: customerId,
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

    it('should work!', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });
});