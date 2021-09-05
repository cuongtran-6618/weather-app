const express = require('express');
const {
    getCityWeather,
    createCityWeather,
    getAllCityWeatherByDate,
} = require('../controllers/weather');

const router = express.Router();

router.route('/').post(createCityWeather);

/* GET weather page. */
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.route('/:city').get(getCityWeather);

/**
 * Get weather daily of all city
 */
router.route('/daily/:date').get(getAllCityWeatherByDate);

module.exports = router;
