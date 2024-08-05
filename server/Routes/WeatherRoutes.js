const express = require('express');
const router = express.Router();
const weatherController = require('../Controller/WeatherController');

router.post('/create', weatherController.createWeather);
router.get('/get', weatherController.getWeather);
router.post('/fetch', weatherController.fetchWeather);
module.exports = router;
