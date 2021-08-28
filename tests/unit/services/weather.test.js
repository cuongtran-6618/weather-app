const {
    fetchWeatherDataByCity,
    insertWeatherDataByCity,
    fetchWeatherDataByDate,
} = require('../../../services/weather');
const request = require('supertest');
const server = require('../../../server');
const serverApp = server();

const { MongoClient } = require('mongodb');

describe('WEATHER CRUD TESTING', () => {
    describe('Client fetchs the weather data of a valid city name', () => {
        // should reponse with 200
        test('should response with 200 status', async () => {
            const weatherFixtures = {
                city: 'random-city',
                date: '7/19/2021',
                icon: 'http://openweathermap.org/img/wn/02d@2x.png',
                temperature: 16.9,
                description: 'few clouds',
                feels_like: 16.34,
                max_temperature: 18.39,
                min_temperature: 15.55,
                visibility: 10000,
            };

            return request(await serverApp)
                .post('/weather')
                .send(weatherFixtures)
                .then((data) => {
                });
            done();
        });

        test('should response with 200 status', async () => {
            const weatherFixtures = {
                city: 'random-city',
                date: '7/19/2021',
                icon: 'http://openweathermap.org/img/wn/02d@2x.png',
                temperature: 16.9,
                description: 'few clouds',
                feels_like: 16.34,
                max_temperature: 18.39,
                min_temperature: 15.55,
                visibility: 10000,
            };

            return request(await serverApp)
                .post('/weather')
                .send(weatherFixtures)
                .then((data) => {
                });
            done();
        });
    });
});
