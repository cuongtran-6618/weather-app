"use strict";

class WeatherService
{

    static getEspooWeatherFormatData ()
    {
        try
        {

            console.log(this.test());

            //this.test();
            const endpoint = this.urlBuilder("espoo");

            console.log(this.getWeatherData());

            return this.getWeatherData();

        } catch (error)
        {
            console.log('Error: ' + error);
            return false;
        }

    }

    async getWeatherData (endpoint)
    {
        const apiResponse = await fetch(endpoint);
        const weatherJsonData = await apiResponse.json();
        return this.formatData(weatherJsonData);
    }

    test ()
    {
        console.log('test');
    }

    static urlBuilder (city = null)
    {
        if (!city)
        {
            return false;
        }

        return `${ process.env.WEATHER_API_ENDPOINT }${ process.env.WEATHER_API_VERSION }/weather?q=${ city }&appid=${ process.env.WEATHER_API_KEY }&units=${ process.env.WEATHER_API_UNIT }`;
    }

    static formatData (weatherJsonData = {})
    {
        const currentDate = new Date();

        return {
            city: weatherJsonData.name,
            date: `${ currentDate.getDate() }-${ currentDate.getMonth() }-${ currentDate.getFullYear() }`,
            icon: weatherJsonData.weather[ 0 ].icon,
            temperature: weatherJsonData.main.temp,
            description: weatherJsonData.weather[ 0 ].description,
            feels_like: weatherJsonData.main.feels_like,
            max_temperature: weatherJsonData.main.temp_max + '°C',
            min_temperature: weatherJsonData.main.temp_min + '°C',
            visibility: weatherJsonData.visibility
        }
    }

}

module.exports = WeatherService;
