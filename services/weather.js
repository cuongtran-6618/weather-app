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
        console.log(error)
    }
};

const fetchWeatherData = async (city) =>
{
    const endpoint = urlBuilder(city);
    const apiResponse = await fetch(endpoint);
    const weatherJsonData = await apiResponse.json();
    console.log(formatWeatherData(weatherJsonData));
    return formatWeatherData(weatherJsonData);
};
