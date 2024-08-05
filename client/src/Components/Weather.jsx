import React, { useEffect, useState } from "react";
import { fetchWeatherLocation } from "../Api/WeatherApi";

const Weather = () => {
  const [location, setLocation] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const weatherFetch = async () => {
      try {
        const weatherFetched = await fetchWeatherLocation(location);
        setWeatherData(weatherFetched);
      } catch (error) {
        console.log('fetching weather error');
        setError('fetching weather error');
      }
    };
    weatherFetch();
  }, [location]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateString = date.toLocaleDateString(); 
    const timeString = date.toLocaleTimeString();  
    return `${dateString} || ${timeString}`;
  };

  return (
    <div className="bg-slate-300 h-2/3 flex justify-center items-center">
      {weatherData ? (
        <div className="bg-orange-200 font-mono text-orange-600 flex flex-col h-2/3 w-1/3 justify-center items-center m-5 rounded-3xl">
          <h2 className="text-2xl font-serif">Today</h2>
          <div className="flex h-1/3 items-center">
            <img src={weatherData.icon} alt="Weather Icon" className="w-full h-full object-cover" />
            <h2 className="text-4xl ml-4">{weatherData.temperature}°C</h2>
          </div>
          <p className="text-lg">{weatherData.description}</p>
          <p className="text-lg">{weatherData.location}</p>
          <p className="text-lg">{formatDateTime(weatherData.date)}</p>
        </div>
      ) : (
        <div className="bg-orange-200 text-orange-600 flex flex-col h-2/3 w-1/3 justify-around items-center m-5 rounded-3xl">
          <p className="text-lg">{error ? error : 'Loading...'}</p>
        </div>
      )}
      <div className="w-1/2">
        <div className="w-full flex flex-col justify-center items-center">
          <ul className="flex justify-around">
            <li>now</li>
            <li>2am</li>
            <li>now</li>
            <li>2am</li>
            <li>now</li>
          </ul>
          <ul className="flex">
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