const request = require('supertest');
const server = require('../../server');
const mongoose = require('mongoose');

beforeEach((done) => {
    mongoose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    );
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

describe('GET /weather', () => {
    describe('Client visit espoo weather page', () => {
        // should reponse with 200
        test('should response with 200 status', async () => {
            return request(server)
                .get('/weather/espoo')
                .expect(200)
                .then((data) => {
                    expect(data.text).toMatch(/Espoo/);
                });
        });
    });
});
