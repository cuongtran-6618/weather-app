const request = require('supertest');
const server = require('../../src/server');
const { getToday } = require('../../src/helpers/weather');
const { mongoose } = require('../fixtures/db');
const Weather = require('../../src/models/Weather');

const serverApp = server();

beforeAll(async () => {
    await Weather.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('WEATHER ENDPOINT', () => {
    describe('Client fetchs the weather data of a valid city name', () => {
        // should reponse with 200
        test('should response with 200 status', async () => {
            const res = await request(serverApp).get('/weather/espoo');
            expect(res.status).toEqual(200);
        });

        test('should response with success status, correct city name and date in response', () =>
            request(serverApp)
                .get('/weather/espoo')
                .then((data) => {
                    const responseData = data.text;
                    expect(responseData).toContain('"success":true');
                    expect(responseData).toContain(`"date":"${getToday()}"`);
                    expect(responseData).toContain('"city":"espoo"');
                })
                .catch((error) => {
                    console.log(error);
                }));
    });

    describe('Client fetchs the weather data of a non exit city', () => {
        // should reponse with 200
        test('should response with 404 status', () =>
            request(serverApp)
                .get('/weather/espoo1')
                .expect(404)
                .catch((error) => {
                    console.log(error);
                }));

        test('should response with success status is false, and error message', () =>
            request(serverApp)
                .get('/weather/espoo1')
                .then((data) => {
                    const responseData = data.text;
                    expect(responseData).toContain('"success":false');
                    expect(responseData).toContain(
                        '"error":"Can\'t find the weather data with the given city"'
                    );
                })
                .catch((error) => {
                    console.log(error);
                }));
    });
});
