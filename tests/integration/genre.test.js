const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {

    beforeEach(() => {
        server = require("../../index");
    });

    afterEach(() => {
        server.close();
    });

    describe("GET /", async () => {
        await Genre.collection.insertMany([
            {
                name: 'genre1',
            },
            {
                name: "genre2"
            }
        ]);
        it("should return all genres", async () => {
            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });

    describe("GET /:id", () => {
        it("should return a genre if valid id is passed", async () => {
            const genre = new Genre({
                name: 'genre1'
            });

            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", genre.name);
        });
    });

});