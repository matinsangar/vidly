const request = require("supertest");
let server;

describe('/api/genres',() => {
    beforeEach(() => {
        server = require("../../app");
    })
    afterEach(() => { server.close() });
    describe('GET /', () => {
        it('should return all Genres', async() => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });
});