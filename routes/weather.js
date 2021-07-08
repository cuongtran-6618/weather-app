var express = require('express');
const { getCityWeather } = require('../controllers/weather');
var router = express.Router();

/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.route('/:city').get(getCityWeather);

module.exports = router;
