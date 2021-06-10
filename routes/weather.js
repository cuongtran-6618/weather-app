var express = require('express');
const { getEspooWeather } = require('../controllers/weather');
var router = express.Router();


/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.get('/', async function (req, res, next)
{
  const endpoint = `${ process.env.WEATHER_API_ENDPOINT }${ process.env.WEATHER_API_VERSION }&units=${ process.env.WEATHER_API_UNIT }`;
  res.render('weather', { title: 'Weather in city' });
});

router.route('/espoo').get(getEspooWeather);


module.exports = router;
