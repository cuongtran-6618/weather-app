const { fetchWeatherDataByCity } = require('../services/weather');
const Weather = require('../models/Weather');

// @desc     Get weather data
// @router  GET /weather/index
// @access  public
module.exports.getWeatherIndex = async (req, res, next) =>
{
    const city = req.params.city;
    const result = await fetchWeatherDataByCity(city);
    res.render('weather/byCity', { title: `Weather in ${ city }`, data: result });
}


// @desc     Get weather data
// @router  GET /weather/:city
// @access  public
module.exports.getCityWeather = async (req, res, next) =>
{
    const city = req.params.city;
    const result = await fetchWeatherDataByCity(city);
    res.render('weather/byCity', { title: `Weather in ${ city }`, data: result });
}


// @desc    Create weather data to database (MongoDB currently)
// @router  POST /weather/
// @access  public
module.exports.createCityWeather = async (req, res, next) =>
{
    try
    {
        console.log('createCityWeather controller called')
        const weatherData = req.body;
        const data = Weather.create(weatherData);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error)
    {
        console.log(error)
    }
}
