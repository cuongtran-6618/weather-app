"use strict";

const fetch = require('node-fetch');

module.exports.fetchWeatherByCity = async (city = 'espoo') =>
{
    try
    {
        const endpoint = urlBuilder(city);
        const response = await getWeatherDataFromEndpoint(endpoint);
        return formatData(response);
    } catch (err)
    {
        return err;
    }
}

const getWeatherDataFromEndpoint = async (endpoint) => 
{
    const apiResponse = await fetch(endpoint);

    if (!apiResponse.ok)
    {
        const message = `An error has occured when fetching weather from endpoint: ${ apiResponse.status }`;
        throw new Error(message);
    }

    const weatherJsonData = await apiResponse.json();

    return weatherJsonData;
}

const urlBuilder = (city) =>
{
    return `${ process.env.WEATHER_API_ENDPOINT }${ process.env.WEATHER_API_VERSION }/weather?q=${ city }&appid=${ process.env.WEATHER_API_KEY }&units=${ process.env.WEATHER_API_UNIT }`;
}

const formatData = (weatherJsonData = {}) =>
{
    const currentDate = new Date();

    return {
        city: weatherJsonData.name,
        date: `${ currentDate.getDate() }-${ currentDate.getMonth() }-${ currentDate.getFullYear() }`,
        icon: weatherJsonData.weather[ 0 ].icon,
        temperature: weatherJsonData.main.temp,
        description: weatherJsonData.weather[ 0 ].description,
        feels_like: weatherJsonData.main.feels_like,
        max_temperature: weatherJsonData.main.temp_max + '°C',
        min_temperature: weatherJsonData.main.temp_min + '°C',
        visibility: weatherJsonData.visibility
    }
}
