import './current-weather.css';
import {TiLocation} from 'react-icons/ti';
import {CiTempHigh as Temp} from 'react-icons/ci';
import {FiWind} from 'react-icons/fi';
import {RiHeavyShowersLine as Hum} from 'react-icons/ri';
import {BiTachometer as FaTA} from 'react-icons/bi';
import {BsSunrise as SRise, BsSunset as Sset} from 'react-icons/bs';



const CurrentWeather = ({data, time, sunRise, sunSet}) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const dayName = daysOfWeek[d.getDay()];

    return(
        <div className='weather'>
            <div className='top'>
                <div className='top-det'>
                    <p className='city'><TiLocation />{data.city}</p>
                    <p className='temp'>{Math.round(data.main.temp)}°C</p>
                    <p className='top2span'>
                        <span className='top-time'>{time}</span><br/>
                        <span className='top-day'>{dayName}</span>
                    </p>
                </div>
                <div>
                    <img alt="weather" className='weather-icon' src={`icons/${data.weather[0].icon}.png`} />
                    <p className='description'>{data.weather[0].description}</p>
                </div>
            </div>
            <div className='bottom'>
                <div className='details'>
                    <div className='pr-top-row'>
                        <span className='pr-top-details'>WEATHER DETAILS</span>
                    </div>
                    <div className='pr-row'>
                        <span className='pr-label'><Temp className='pr-label-icon'/>&nbsp; Feels Like</span>
                        <span className='pr-value'>{Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div className='pr-row'>
                        <span className='pr-label'><FiWind className='pr-label-icon'/>&nbsp; Wind</span>
                        <span className='pr-value'>{data.wind.speed} m/s</span>
                    </div>
                    <div className='pr-row'>
                        <span className='pr-label'><Hum className='pr-label-icon'/>&nbsp; Humidity</span>
                        <span className='pr-value'>{data.main.humidity}%</span>
                    </div>
                    <div className='pr-row'>
                        <span className='pr-label'><FaTA className='pr-label-icon'/>&nbsp; Pressure</span>
                        <span className='pr-value'>{data.main.pressure} hPa</span>
                    </div>
                    <div className='pr-row'>
                        <span className='pr-label'><SRise className='pr-label-icon'/>&nbsp; Sunrise</span>
                        <span className='pr-value'>{sunRise}</span>
                    </div>
                    <div className='pr-row'>
                        <span className='pr-label'><Sset className='pr-label-icon'/>&nbsp; Sunset</span>
                        <span className='pr-value'>{sunSet}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;