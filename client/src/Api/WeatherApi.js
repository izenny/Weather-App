import axios from "axios";

export const fetchWeatherLocation = async (location) => {
  try {
    const response = await axios.post("http://localhost:5000/weather/fetch", {
      location,
    });
    console.log("weather", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
export const saveHistory = async (weatherData) => {
    try {
      const response = await axios.post("http://localhost:5000/weather/create", {
        location: weatherData.location,
        temperature: weatherData.temperature,
        description: weatherData.description,
        icon: weatherData.icon,
        date: weatherData.date,
      });
      console.log("weather saved", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving weather data:", error);
      return null;
    }
  };
