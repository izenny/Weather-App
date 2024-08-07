import React, { useEffect, useState } from "react";
import { fetchWeatherLocation, saveHistory } from "../Api/WeatherApi";

const Weather = () => {
  const [location, setLocation] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [locations] = useState([
    "Delhi",
    "Moscow",
    "Paris",
    "New York",
    "Sydney",
    "Riyadh",
  ]);

  useEffect(() => {
    const weatherFetch = async () => {
      try {
        const weatherFetched = await fetchWeatherLocation(location);
        setWeatherData(weatherFetched);
        await saveHistory(weatherFetched);
      } catch (error) {
        console.log("fetching weather error");
        setError("fetching weather error");
      }
    };
    weatherFetch();
  }, [location]);
  useEffect(()=>{
    const fetchHistory = async()=>{
      const history = await fetchHistory()
    }
  })

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${dateString} || ${timeString}`;
  };

  return (
    <div className=" h-full md:h-2/3 rounded-3xl flex-col md:flex-row flex justify-center items-center " 
    style={{
      backgroundImage: "url('/public/bg.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {weatherData ? (
        <div className="bg-blue-100  font-mono text-orange-600 flex flex-col w-3/4 h-1/3 md:h-2/3 md:w-1/3 justify-around p-3 items-center m-5 rounded-3xl">
          <h2 className="text-3xl font-serif">Today</h2>
          <div className="flex items-center">
            <img
              src={weatherData.icon}
              alt="Weather Icon"
              className="w-full h-full object-cover"
            />
            <h2 className="text-[2rem] ml-4">{weatherData.temperature}°C</h2>
          </div>
          <p className="text-lg">{weatherData.description}</p>
          {/* <p className="text-lg">{weatherData.location}</p> */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-lg outline-none"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <p className="text-lg">{formatDateTime(weatherData.date)}</p>
        </div>
      ) : (
        <div className="bg-orange-200 text-orange-600 flex flex-col h-2/3  w-1/3 justify-around items-center m-5 rounded-3xl">
          <p className="text-lg">{error ? error : "Loading..."}</p>
        </div>
      )}
      <div className=" flex flex-col justify-center p-5 items-center  h-2/3">
        <div className="bg-white/30 backdrop-blur-md p-5 rounded-lg shadow-lg w-full flex flex-col items-center">
          <ul className="flex w-full justify-around">
            <li>now</li>
            <li>2am</li>
            <li>now</li>
            <li>2am</li>
            <li>now</li>
          </ul>
          <ul className="flex w-full justify-around">
            <li>2am</li>
            <li>now</li>
            <li>2am</li>
            <li>now</li>
            <li>2am</li>
          </ul>
        </div>
        <div>
          <h2>Random Text</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            alias quos veniam, repudiandae ipsum porro distinctio ducimus vero
            est ad!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
