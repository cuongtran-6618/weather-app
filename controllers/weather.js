const { fetchWeatherDataByCity } = require('../services/weather');


// @desc     Get weather data
// @router  GET /weather/:city
// @access  public
module.exports.getCityWeather = async (req, res, next) =>
{
    const city = req.params.city;
    const result = await fetchWeatherDataByCity(city);
    console.log(result.icon);
    res.render('weather/byCity', { title: `Weather in ${ city }`, data: result });
}
