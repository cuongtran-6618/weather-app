var express = require('express');
const { getCityWeather, createCityWeather } = require('../controllers/weather');
var router = express.Router();

router.route('/').post(createCityWeather);

/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.route('/:city').get(getCityWeather);

module.exports = router;