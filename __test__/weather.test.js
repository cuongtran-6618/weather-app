const request = require('supertest');
const app = require('../app');

describe('GET /weather', () =>
{
    describe('Client visit espoo weather page', () =>
    {
        // should reponse with 200
        test("should response with 200 status", async () =>
        {
            return request(app)
                .get('/weather/espoo')
                .expect(200)
                .then((data) =>
                {
                    expect(data.text).toMatch(/Espoo/);
                });
        });
    })
});