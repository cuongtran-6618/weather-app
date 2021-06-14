const { fetchWeatherDataByCity } = require('../services/weather');


// @des     Get espoo weather data
// @router  GET /weather/espoo
// @access  public
module.exports.getEspooWeather = async (req, res, next) =>
{

    const city = req.params.city;
    const result = await fetchWeatherDataByCity(city);
    console.log(result);
    res.render('weather/espoo', { title: 'Weather in Espoo', data: result });
}
