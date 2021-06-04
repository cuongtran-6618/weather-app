var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
router.get('/', async function (req, res, next)
{
  const endpoint = `${process.env.API_ENDPOINT}${process.env.API_VERSION}`;
  res.render('weather', { title: 'Weather in city' });
});

router.get('/espoo', async function (req, res, next)
{
  try
  {
    const endpoint = urlBuilder();

    const apiResponse = await fetch(endpoint);
    const weatherJsonData = await apiResponse.json();

    res.render('weather/espoo', { title: 'Weather in Espoo', data: weatherJsonData });
  } catch (error)
  {
    console.log(error)
  }

});

function urlBuilder (city = "espoo")
{
  return `${process.env.WEATHER_API_ENDPOINT}${process.env.WEATHER_API_VERSION}/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;
}

module.exports = router;
