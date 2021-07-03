const { fetchWeatherDataByCity, insertWeatherDataByCity } = require('../services/weather');
const Weather = require('../models/Weather');
const { getToday } = require('../helpers/weather');

// @desc     Get weather data
// @router  GET /weather/index
// @access  public
module.exports.getWeatherIndex = async (req, res, next) =>
{
    const city = req.params.city;
    const result = await fetchWeatherDataByCity(city);
    res.render('weather/byCity', { title: `Weather in ${ city }`, data: result });
}


/**
 * Get city weather
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getCityWeather = async (req, res, next) =>
{
    try
    {
        const city = req.params.city;
        const weatherResult = await fetchWeatherDataByCity(city);

        res.status(200).json({ success: true, data: weatherResult })
    } catch (error)
    {
        next(error)
    }

}

// @desc    Create weather data to database (MongoDB currently)
// @router  POST /weather/
// @access  public
module.exports.createCityWeather = async (req, res, next) =>
{
    try
    {
        const weatherData = req.body;
        const result = insertWeatherDataByCity(weatherData);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error)
    {
        next(error);
    }
}
