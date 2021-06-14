const { fetchWeatherDataByCity } = require('../services/weather');


// @des     Get weather data
// @router  GET /weather/:city
// @access  public
module.exports.getCityWeather = async (req, res, next) =>
{
    const city = req.params.city;
    const result = await fetchWeatherDataByCity(city);
    res.render('weather/espoo', { title: 'Weather in Espoo', data: result });
}
