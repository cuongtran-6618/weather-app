const fetch = require('node-fetch');
const Weather = require('../models/Weather');
const { urlBuilder, formatWeatherData, getToday } = require('../helpers/weather');

/**
 * Fetching data from open weather API
 * @route /weather/:city
 * @param string city
 */
module.exports.fetchWeatherDataByCity = async (city) =>
{
    try
    {
        const today = getToday();

        // check from db first
        let weatherJsonData = await Weather.findOne({ city, date: today });

        // if there is not data for that then loading from third party service
        // then insert in to db
        if (!weatherJsonData)
        {
            console.log("load from api")
            weatherJsonData = await fetchWeatherDataFromAPI(city);

            this.insertWeatherDataByCity(weatherJsonData);
        } else
        {
            console.log(`load weather data from db`);
        }
        return weatherJsonData;
    } catch (error)
    {
        console.log(error)
        return error;
    }
};

/**
 * Fetch data from API and then format the data
 * @param {string} city 
 * @returns array
 */
const fetchWeatherDataFromAPI = async (city) =>
{
    const endpoint = urlBuilder(city);
    const apiResponse = await fetch(endpoint);
    const weatherJsonData = await apiResponse.json();

    return formatWeatherData(weatherJsonData);
};


/**
 * Insert data from open waether API
 * @route /weather/:city
 * @param string city
 */
module.exports.insertWeatherDataByCity = async (weatherData) =>
{
    try
    {
        console.log(`service insert weather data`);
        return Weather.create(weatherData);
    } catch (error)
    {
        return error
    }
};
