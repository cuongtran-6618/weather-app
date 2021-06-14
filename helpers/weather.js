module.exports.urlBuilder = (city) =>
{
    return `${ process.env.WEATHER_API_ENDPOINT }${ process.env.WEATHER_API_VERSION }/weather?q=${ city }&appid=${ process.env.WEATHER_API_KEY }`;
}

module.exports.formatWeatherData = (weatherJsonData = {}) =>
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
