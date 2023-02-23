import './App.css';
import Search from './components/search/search';
import Current from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './API';
import { useState, useEffect } from 'react';
import ForeCast from './components/forecast/forecast';
import Logo from './components/images/weatherLogo.png';

function App() {

  const [CurrentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [time, setTime] = useState(null);


  const handleOnSearchChange = (searchData) => {
    // console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });

    }).catch((err) => {
      console.log(err);
    })

  }

  const calcTime = (offset) => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (1000 * offset));
    return nd.toLocaleTimeString([], {hour: 'numeric', minute:'numeric', hour12: true});
  }
  useEffect(() => {
    if (CurrentWeather) {
      const interval = setInterval(() => {
        setTime(calcTime(CurrentWeather.timezone));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [CurrentWeather]);

  // const sunRise = "sunRise";
  // const sunSet = "sunSet";

  const getSunriseSunsetTime = (time, offset) => {
    const date = new Date((time + offset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // console.log(forecast);

  return (
    <div className="container">
      { CurrentWeather && forecast ? null : <div className='Weather-app-main'>
        <img alt='Weather-app-logo' src={Logo} className='Weather-app-logo'/>
        <h1 className='Weather-app-title'>Weather App</h1>
        <p className='Weather-app-p-description'>Access the current weather, 5 day weather forecast and other useful weather information from anywhere on Earth including over 200,000 cities!</p>
      </div>}
      <Search onSearchChange={handleOnSearchChange} />
      <div className='contents'>
        {CurrentWeather ? 
        <Current 
          data={CurrentWeather} 
          time={time} 
          sunRise={getSunriseSunsetTime(CurrentWeather.sys.sunrise, CurrentWeather.timezone)} 
          sunSet={getSunriseSunsetTime(CurrentWeather.sys.sunset, CurrentWeather.timezone)} 
        /> : null}
        {forecast ? <ForeCast data={forecast} /> : null}
      </div>
      { CurrentWeather && forecast ? null : <div className='weather-app-details'>
          <p>The Weather details that you will see will come from OpenWeatherMap.org. They collect and process weather data from different sources such as global and local weather models, satellites, radars and a vast network of weather stations.</p>
        </div>}
    </div>
  );
}

export default App;
