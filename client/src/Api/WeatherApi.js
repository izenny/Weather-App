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
