const WeatherService = require('../services/weather');


// @des     Get espoo weather data
// @router  GET /weather/espoo
// @access  public
exports.getEspooWeather = (req, res, next) =>
{

    try
    {
        const result = WeatherService.getEspooWeatherFormatData();
        console.log(result);
        res.status(200).render('weather/espoo', { title: 'Weather in Espoo', data: result });
    } catch (error)
    {
        console.log(error)
    }

    /*
        res.status(200).json({
            success: true,
            message: 'succesful'
        });
    */
}
