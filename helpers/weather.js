module.exports.urlBuilder = (city) =>
    `${process.env.WEATHER_API_ENDPOINT}${process.env.WEATHER_API_VERSION}/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;

/**
 * Format weather data
 * @param {*} weatherJsonData
 * @returns
 */
module.exports.formatWeatherData = (weatherJsonData = {}) => ({
    city: weatherJsonData.name.toLowerCase(),
    date: this.getToday(),
    icon: `${process.env.WEATHER_API_IMAGE_PATH}${weatherJsonData.weather[0].icon}${process.env.IMAGE_SUBFIX}`,
    temperature: weatherJsonData.main.temp,
    description: weatherJsonData.weather[0].description,
    feels_like: weatherJsonData.main.feels_like,
    max_temperature: weatherJsonData.main.temp_max,
    min_temperature: weatherJsonData.main.temp_min,
    visibility: weatherJsonData.visibility,
});

/**
 * Generate the current date
 * @returns string
 */
module.exports.getToday = () => new Date().toLocaleDateString();
