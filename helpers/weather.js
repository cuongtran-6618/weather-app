module.exports.urlBuilder = (city) => {
    return `${process.env.WEATHER_API_ENDPOINT}${process.env.WEATHER_API_VERSION}/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
};

/**
 * Format weather data
 * @param {*} weatherJsonData
 * @returns
 */
module.exports.formatWeatherData = (weatherJsonData = {}) => {
    const currentDate = new Date();

    return {
        city: weatherJsonData.name,
        date: `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`,
        icon: `${process.env.WEATHER_API_IMAGE_PATH}${weatherJsonData.weather[0].icon}${process.env.IMAGE_SUBFIX}`,
        temperature: weatherJsonData.main.temp + '°C',
        description: weatherJsonData.weather[0].description,
        feels_like: weatherJsonData.main.feels_like,
        max_temperature: weatherJsonData.main.temp_max + '°C',
        min_temperature: weatherJsonData.main.temp_min + '°C',
        visibility: weatherJsonData.visibility,
    };
};
