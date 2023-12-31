const request = require("supertest");
let server;
//const config = require('../../config');
const { Genre, genreSchema } = require('../../models/genre');
const User = require("../../models/users");
const { body } = require("express-validator");
const jwt = require('jsonwebtoken');
const { token } = require("morgan");


describe('/api/genres', () => {
    // Setup step that runs before each test case in the test suite
    beforeEach(() => {
        server = require("../../app");
    });

    // Setup step that runs after each test case in the test suite
    afterEach(async () => {
        await server.close();
    });

    describe('GET /', () => {
        it('should return all Genres', async () => {
            await Genre.deleteMany({}); //clean all the collection OR we can not repet the test operation 
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy(); //some method : It checks if at least one element in the array satisfies a certain condition
        });
    });
    describe('GET /:id', () => {
        it('should return a valid Genre with valid given ID', async () => {
            const genre = new Genre({ name: "genre1" });
            await genre.save();
            const res = await request(server).get("/api/genres/" + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", genre.name);
        });
        it('should return 404 status if invalid id is passed', async () => {
            const res = await request(server).get("/api/genres/887987987987");
            expect(res.status).toBe(404);
        });
    });
    describe('Post /', () => {
        it('should return 401 status if invalid user want to add', async () => {
            const res = await request(server).post("/api/genres")
                .send({ name: "genre1" });
            expect(res.status).toBe(401);
        });
        it('should return 400 status if genre is invalid (less then 3 char) ', async () => {
            const user = new User();
            const payload = { _id: user._id };
            // 1234 is my Test Secret Key
            const Token = jwt.sign(payload, "1234");
            const res = await request(server)
                .post("/api/genres")
                .set('x-auth-token', Token)
                .send({ name: "13" });
            expect(res.status).toBe(400);
        });
        //happy path test
        it("should save the valid genrer if it is valid", async () => {
            const user = new User();
            const payload = { _id: user._id };
            const Token = jwt.sign(payload, "1234");
            const res = await request(server).post('/api/genres')
                .set('x-auth-token', Token)
                .send({ name: "genre1" });

            const temp = await Genre.find({ name: "genre1" });
            expect(temp).not.toBeNull();
        });
        it("should save the valid genrer if it is valid", async () => {
            const user = new User();
            const payload = { _id: user._id };
            const Token = jwt.sign(payload, "1234");
            const res = await request(server).post('/api/genres')
                .set('x-auth-token', Token)
                .send({ name: "genre1" });

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
    describe('DELETE /', () => {
        it('should delete genre if user is Admin', async () => {
            const user = new User({ isAdmin: true });
            const payload = { id: user._id, isAdmin: user.isAdmin };
            const token = jwt.sign(payload, "1234");
            const genre = new Genre({ name: "Genre134" });
            await genre.save();
            const res = await request(server)
                .delete(`/api/genres/${genre._id}`)
                .set('x-auth-token', token);
            expect(res.status).toBe(200);
            expect(res.text).toBe('Deleted');
            const deletedGenre = await Genre.findById(genre._id);
            expect(deletedGenre).toBeNull();
        });
        it('should return 403 if user is not admin', async () => {
            const user = new User({ isAdmin: false });
            const payload = { id: user._id, isAdmin: user.isAdmin };
            const token = jwt.sign(payload, "1234");
            const genre = new Genre({ name: "Genre134" });
            await genre.save();
            const res = await request(server)
                .delete(`/api/genres/${genre._id}`)
                .set('x-auth-token', token);
            expect(res.status).toBe(403);
            expect(res.text).toBe('Access denied...');
        });
    });
});
