var express = require('express');
const { getEspooWeather } = require('../controllers/weather');
var router = express.Router();

/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.route('/:city').get(getEspooWeather);

module.exports = router;