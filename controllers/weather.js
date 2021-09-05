const {
    fetchWeatherDataByCity,
    insertWeatherDataByCity,
    fetchWeatherDataByDate,
} = require('../services/weather');

const { NotFoundException } = require('../exceptions/NotFoundException');

/**
 * Get city weather
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.getCityWeather = async (req, res, next) => {
    try {
        const { city } = req.params;
        const weatherResult = await fetchWeatherDataByCity(city);
        res.json({ success: true, data: weatherResult });
    } catch (error) {
        next(error);
    }
};

// @desc    Create weather data to database (MongoDB currently)
// @router  POST /weather/
// @access  public
module.exports.createCityWeather = async (req, res, next) => {
    try {
        const weatherData = req.body;
        const result = insertWeatherDataByCity(weatherData);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all city weather by date
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.getAllCityWeatherByDate = async (req, res, next) => {
    try {
        const { date } = req.params;
        const weatherResult = await fetchWeatherDataByDate(date);

        if (!weatherResult.length) {
            throw new NotFoundException("Can't find the weather data by date");
        }

        res.json({ success: true, data: weatherResult });
    } catch (error) {
        next(error);
    }
};
