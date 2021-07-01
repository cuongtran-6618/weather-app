const fetch = require('node-fetch');
const { urlBuilder, formatWeatherData } = require('../helpers/weather');

/**
 * Fetching data from open waether API
 * @route /weather/:city
 * @param string city
 */
module.exports.fetchWeatherDataByCity = async (city) =>
{
    try
    {
        const weatherJsonData = await fetchWeatherData(city);
        return weatherJsonData;
    } catch (error)
    {
        return false;
    }
};

const fetchWeatherData = async (city) =>
{
    const endpoint = urlBuilder(city);
    const apiResponse = await fetch(endpoint);
    const weatherJsonData = await apiResponse.json();
    const statusCode = parseInt(weatherJsonData.cod);

    if (404 === statusCode)
    {
        throw new Error(`Can't fetch the data for ${ city }`);
    }

    if (200 === statusCode)
    {
        return formatWeatherData(weatherJsonData);
    }
};
