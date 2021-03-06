const fetch = require('node-fetch');
const Weather = require('../models/Weather');
const {
    urlBuilder,
    formatWeatherData,
    getToday,
    formatDate,
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

    if (apiResponseJson.cod === '404') {
        throw new NotFoundException(
            "Can't find the weather data with the given city"
        );
    }

    const weatherDataFromAPI = formatWeatherData(apiResponseJson);
    try {
        const success = await this.insertWeatherDataByCity(weatherDataFromAPI);

        if (success) {
            //console.log('Saving weather record successfully');
        } else {
            //console.log('Not able to save in the DB');
        }
    } catch (error) {
        throw new BadRequestError(
            "There's a problem when insert data to MongoDB after fetching data from API"
        );
    }

    return weatherDataFromAPI;
};

module.exports.insertWeatherDataByCity = async (weatherData) => {
    try {
        const isRecordExisted = await Weather.exists(weatherData);

        if (isRecordExisted) {
            console.log(
                await Weather.findOne({
                    city: weatherData.city,
                    date: weatherData.date,
                })
            );
        } else {
            const insertWeatherResponse = await Weather.create(weatherData);
            return insertWeatherResponse;
        }
    } catch (error) {
        throw new BadRequestError("Can't insert to Mongo DB with given data");
    }
};

/**
 * Fetching data of all city by date
 * @route /daily/:date
 * @param string date
 */
module.exports.fetchWeatherDataByDate = async (date = null) => {
    const searchDay = date !== null ? formatDate(date) : getToday();
    // check from db
    const weatherDataInDB = await Weather.find({ date: searchDay });

    if (!weatherDataInDB) {
        throw new NotFoundException(
            "Can't find the weather data with the given date"
        );
    }

    return weatherDataInDB;
};
