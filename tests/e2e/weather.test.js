const request = require('supertest');
const server = require('../../server');
const mongoose = require('mongoose');

const serverApp = server();

describe('Test weather endpoint', () => {
    describe('Client fetchs the weather data of a valid data page', () => {
        // should reponse with 200
        test('should response with 200 status', async () => {
            return request(serverApp)
                .get('/weather/espoo')
                .expect(200)
                .then((data) => {
                    const responseData = data.text;
                    expect(responseData);
                });

            done();
        });

        test('should response with success status', async () => {
            return request(serverApp)
                .get('/weather/espoo')
                .then((data) => {
                    const responseData = data.text;
                    expect(responseData).toContain('"success":true');
                });

            done();
        });
    });
});
