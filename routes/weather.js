const express = require('express');
const {
    getCityWeather,
    createCityWeather,
    getAllCityWeatherByDate,
} = require('../controllers/weather');

const router = express.Router();

router.route('/').post(createCityWeather);

/**
 * Get weather daily of all city by date (date format: 14-11-2021)
 */
router.route('/daily/:date').get(getAllCityWeatherByDate);

/* GET weather page */
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.route('/:city').get(getCityWeather);

module.exports = router;
