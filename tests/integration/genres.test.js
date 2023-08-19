const request = require("supertest");
let server;
const { Genre, genreSchema } = require('../../models/genre');
const { body } = require("express-validator");
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
        });  //Fix timeout issue we can add timer 
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
});
