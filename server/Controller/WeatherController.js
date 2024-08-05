const axios = require('axios');
const Weather = require('../Modals/WeatherSchema');

exports.createWeather = async (req, res) => {
  const { location, temperature, description, icon, date } = req.body;
  try {
    const newWeather = new Weather({
      temperature,
      description,
      icon,
      date,
      location,
    });
    await newWeather.save();
    res.status(201).json(newWeather);
  } catch (error) {
    console.log('Error saving weather data:', error);
    res.status(500).json({ error: 'Error saving weather data' });
  }
};
exports.getWeather = async (req, res) => {
  const { location, from, to } = req.query;
  try {
    const weatherData = await Weather.find({
      location,
      date: { $gte: from, $lte: to },
    });
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

exports.fetchWeather = async (req, res) => {
  const { location } = req.body;
//   const apiKey = process.env.APIKEY;
const apiKey = '85c08baf44ef7b32c37a40144b755a56';

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    const weather = response.data;

    res.status(200).json({
      temperature: weather.main.temp,
      description: weather.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
      date: new Date().toISOString(),
      location,
    });
  } catch (error) {
    console.log('err',error);
    
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};
