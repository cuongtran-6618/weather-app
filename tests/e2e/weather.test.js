const request = require('supertest');
const server = require('../../server');
const { getToday } = require('../../helpers/weather');
const serverApp = server();

describe('WEATHER ENDPOINT', () => {
    describe('Client fetchs the weather data of a valid city name', () => {
        // should reponse with 200
        test('should response with 200 status', async () => {
            return request(serverApp).get('/weather/espoo').expect(200);
            done();
        });

        test('should response with success status, correct city name and date in response', async () => {
            return request(serverApp)
                .get('/weather/espoo')
                .then((data) => {
                    const responseData = data.text;
                    expect(responseData).toContain('"success":true');
                    expect(responseData).toContain(`"date":"${getToday()}"`);
                    expect(responseData).toContain('"city":"espoo"');
                });

            done();
        });
    });

    describe('Client fetchs the weather data of a non exit city', () => {
        // should reponse with 200
        test('should response with 404 status', async () => {
            return request(serverApp).get('/weather/espoo1').expect(404);
            done();
        });

        test('should response with success status is false, and error message', async () => {
            return request(serverApp)
                .get('/weather/espoo1')
                .then((data) => {
                    const responseData = data.text;
                    expect(responseData).toContain('"success":false');
                    expect(responseData).toContain(
                        '"error":"Can\'t find the weather data with the given city"'
                    );
                });
            done();
        });
    });
});
