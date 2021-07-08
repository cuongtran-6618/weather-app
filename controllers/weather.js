const { fetchWeatherDataByCity } = require('../services/weather');

// @desc    Get weather data
// @router  GET /weather/:city
// @access  public
module.exports.getCityWeather = async (req, res, next) => {
    const city = req.params.city.trim();

    if (!city) {
        res.status(400).send({
            message: 'Invalid city name',
        });
    }

    const result = await fetchWeatherDataByCity(city);

    if (result) {
        res.send(result);
    } else {
        res.status(400).send({
            message: `Can't fetch the weather data of ${city}`,
        });
    }
};
