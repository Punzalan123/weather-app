import { AccordionItemHeading, Accordion, AccordionItem, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import './forecast.css';

const Week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ForeCast = ({ data }) => {
    // It's only 5 days, Start from 7, 15, 23, 31, 39
    const list = data.list; // array of weather forecast for 5 days
    const selectedElements = [
        list[7],
        list[15],
        list[23],
        list[31],
        list[39],
    ];
    const hourlySelected = [
        list[0],
        list[1],
        list[2],
        list[3]
        // list[4],
        // list[5],
        // list[6],
        // list[7]
    ];

    const today = new Date();
    const nextFiveDays = [];

    for (let i = 1; i <= 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        nextFiveDays.push(Week[nextDay.getDay()]);
    }

    const convertTime = (currentTime) => {
        const date = new Date(currentTime);
        const convertedTime = date.toLocaleString([], { hour: 'numeric', hour12: true });
        return convertedTime;
    };

    // console.log(data);

    return (
        <div className='forecast'>
            <div className='hourly-forecast'>
                <label className='hour-title'>TODAY'S FORECAST</label>
                <div className='hour-forecast-divs'>
                    {hourlySelected.map((item, idx) => (
                        <div className='hour' key={idx}>
                            <p className='hour-forecast-time'>{convertTime(item.dt_txt) }</p>
                            <img alt="weather" className='icon-small' src={`icons/${item.weather[0].icon}.png`} />
                            <p className='hourly-description-forecast'>{item.weather[0].description}</p>
                        </div>
                    ) )}
                </div>
            </div>
            <div className='daily-forecast'>
                <label className="title">DAILY FORECAST</label>
                <Accordion allowZeroExpanded>
                    {selectedElements.map((item, idx) => (
                        <AccordionItem key={idx}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className='daily-item'>
                                        <img alt="weather" className='icon-small' src={`icons/${item.weather[0].icon}.png`} />
                                        <label className='day'>{nextFiveDays[idx]}</label>
                                        <label className='description-forecast'>{item.weather[0].description}</label>
                                        <label className='min-max'>
                                            {Math.round(item.main.temp_min)}°C / {" "} 
                                            {Math.round(item.main.temp_max)}°C
                                        </label>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='daily-details'>
                                    <div className='daily-details-item'>
                                        <label >Pressure</label>
                                        <label >{item.main.pressure} hPa</label>
                                    </div>
                                    <div className='daily-details-item'>
                                        <label >Humidity</label>
                                        <label >{item.main.humidity}%</label>
                                    </div>
                                    <div className='daily-details-item'>
                                        <label >Clouds</label>
                                        <label >{item.clouds.all}%</label>
                                    </div>
                                    <div className='daily-details-item'>
                                        <label >Wind Speed</label>
                                        <label >{item.wind.speed} m/s</label>
                                    </div>
                                    <div className='daily-details-item'>
                                        <label >Ground level</label>
                                        <label >{item.main.grnd_level} hPa</label>
                                    </div>
                                    <div className='daily-details-item'>
                                        <label >Feels Like</label>
                                        <label >{Math.round(item.main.feels_like)}°C</label>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default ForeCast;