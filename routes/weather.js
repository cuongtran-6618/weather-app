var express = require('express');
const { getEspooWeather } = require('../controllers/weather');
var router = express.Router();
const fetch = require('node-fetch');

/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.get('/', async function (req, res, next)
{
  const endpoint = `${process.env.WEATHER_API_ENDPOINT}${process.env.WEATHER_API_VERSION}&units=${process.env.WEATHER_API_UNIT}`;
  res.render('weather', { title: 'Weather in city' });
});
/*
router.get('/espoo', async function (req, res, next)
{
  try
  {
    const endpoint = urlBuilder();
    const apiResponse = await fetch(endpoint);
    const weatherJsonData = await apiResponse.json();
    const result = formatData(weatherJsonData);
    console.log(result);
    res.render('weather/espoo', { title: 'Weather in Espoo', data: result });
  } catch (error)
  {
    console.log(error)
  }

});
*/

router.route('/espoo').get(getEspooWeather);


module.exports = router;
