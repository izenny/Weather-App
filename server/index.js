const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const WeatherRoutes = require('./Routes/WeatherRoutes')
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/weather',WeatherRoutes)
mongoose.connect(process.env.mongo_url).then(() => {
    console.log("connected to database");
  });
  
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`connected to ${PORT} port`);
  });
  