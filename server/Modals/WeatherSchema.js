const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
    temperature: Number,
    description: String,
    icon: String,
    date: String,
    location: String
  });
  
  const Weather = mongoose.model('Weather', weatherSchema);
  