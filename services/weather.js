const fetch = require('node-fetch');
const Weather = require('../models/Weather');
const {
    urlBuilder,
    formatWeatherData,
    getToday,
} = require('../helpers/weather');
const { BadRequestError } = require('../exceptions/BadRequestError');
const { NotFoundException } = require('../exceptions/NotFoundException');

/**
 * Fetching data from open weather API
 * @route /weather/:city
 * @param string city
 */
module.exports.fetchWeatherDataByCity = async (city) => {
    const today = getToday();

    // check from db first
    const weatherDataInDB = await Weather.findOne({ city, date: today });

    if (weatherDataInDB) {
        return weatherDataInDB;
    }

    // if there is not data for that then loading from third party service
    // then insert in to db
    const weatherEndpoint = urlBuilder(city);
    const apiResponse = await fetch(weatherEndpoint);
    const apiResponseJson = await apiResponse.json();

    if ('404' === apiResponseJson.cod) {
        throw new NotFoundException();
    }

    const weatherDataFromAPI = formatWeatherData(apiResponseJson);

    try {
        const insertResponse = await this.insertWeatherDataByCity(
            weatherDataFromAPI
        );
    } catch (error) {
        throw new BadRequestError();
    }

    return weatherDataFromAPI;
};

/**
 * Insert data from open waether API
 * @route /weather/:city
 * @param string city
 */
module.exports.insertWeatherDataByCity = async (weatherData) => {
    try {
        const insertWeatherResponse = await Weather.create(weatherData);
        return insertWeatherResponse;
    } catch (error) {
        throw new BadRequestError();
    }
};

/**
 * Fetching data of all city by date
 * @route /weather/:city
 * @param string city
 */
module.exports.fetchWeatherDataByDate = async (date = null) => {
    const searchDay = !date ? getToday() : date;

    // check from db
    let weatherDataInDB = await Weather.find({ date: searchDay });

    if (!weatherDataInDB) {
        throw new NotFoundException();
    }

    return weatherDataInDB;
};
