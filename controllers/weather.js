const { fetchWeatherByCity } = require('../services/weather');


// @des     Get espoo weather data
// @router  GET /weather/espoo
// @access  public
exports.getEspooWeather = (req, res, next) =>
{

    const data = fetchWeatherByCity().then(result =>
    {
        res.render('weather/espoo', { title: 'Weather in Espoo', data: result });
    }).catch(error =>
    {
        res.render('weather/no-city', { title: 'There is an error when fetching espoo weather data', data: result });
    });
}
