var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const { urlBuilder, formatWeatherData } = require('../helpers/weather');

/* GET weather page. */
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
/**
 * @description Fetch format data from open weather API
 * 
 */
router.get('/:city', async function (req, res, next)
{
  try
  {
    const city = req.params.city;
    const weatherJsonData = await fetchWeatherData(city);
    res.render('weather/byCity', { title: `Weather in ${ city }`, data: weatherJsonData });
  } catch (error)
  {
    console.log(error)
  }
});

/**
 * 
 * @param string city 
 * @returns 
 */
const fetchWeatherData = async (city) =>
{
  const endpoint = urlBuilder(city);
  const apiResponse = await fetch(endpoint);
  const weatherJsonData = await apiResponse.json();

  return formatWeatherData(weatherJsonData);
};

module.exports = router;
