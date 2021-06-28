const { fetchWeatherDataByCity } = require('../services/weather');

// @desc     Get weather data for index page (duplicate with getCityWeather, should be refactor or remove)
// @router  GET /weather/index
// @access  public
module.exports.getWeatherIndex = async (req, res, next) =>
{
    const city = req.params.city;

    if (!city || "" === city)
    {
        res.send({
            "message": "error"
        });
    }

    const result = await fetchWeatherDataByCity(city);
    res.render('weather/byCity', { title: `Weather in ${ city }`, data: result });
}


// @desc     Get weather data
// @router  GET /weather/:city
// @access  public
module.exports.getCityWeather = async (req, res, next) =>
{
    const city = req.params.city;

    if (!city || " " === city)
    {
        res.send({
            "message": "error"
        });
    }

    const result = await fetchWeatherDataByCity(city);
    res.send(result);
}
