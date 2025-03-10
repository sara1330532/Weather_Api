//This React component displays detailed weather information, including temperature, wind, humidity, and precipitation.
// It also shows the weather forecast for the past few hours based on API data.
import '../style/Weather.css';

const Weather = ({ data }) => {

    // If we didn't receive any data from the server,
    // return an empty element   
    if (!data) {
        return (
            <div className="weather-container-wrapper"></div>
        );
    }

    let date = new Date(data.location.localtime);
    let hours = date.getHours();
    let arrHours = data.forecast.forecastday[0].hour;

    // Helper functions for generating time and temperature
    const extractTime = (time) => {
        return time ? time.substring(11, 16) : "";
    };

    const extractTemp = (time) => {
        return time ? Math.floor(parseFloat(time)) + "°" : "";
    };

    // Create an array of hours with the data
    const hourly = [
        { time: hours - 1 >= 0 ? extractTime(arrHours[hours - 1].time) : "", temp: extractTemp(arrHours[hours - 1]?.temp_c) },
        { time: hours - 2 >= 0 ? extractTime(arrHours[hours - 2].time) : "", temp: extractTemp(arrHours[hours - 2]?.temp_c) },
        { time: hours - 3 >= 0 ? extractTime(arrHours[hours - 3].time) : "", temp: extractTemp(arrHours[hours - 3]?.temp_c) },
        { time: extractTime(arrHours[hours].time), temp: extractTemp(arrHours[hours].temp_c) },
        {
            time: hours + 1 < arrHours.length ? extractTime(arrHours[hours + 1].time) : extractTime(data.forecast.forecastday[1].hour[0].time),
            temp: hours + 1 < arrHours.length ? extractTemp(arrHours[hours + 1].temp_c) : extractTemp(data.forecast.forecastday[1].hour[0].temp_c)
        }
    ];

    const weatherDetails = {
        city: data.location.name,
        country: data.location.country,
        dateTime: new Date(data.location.localtime).toLocaleString(),
        temp: Math.floor(parseFloat(data.current.temp_c)) + "°",
        wind: data.current.wind_mph,
        humidity: data.current.humidity,
        precipitation: data.current.precip_mm,
        text: data.forecast.forecastday[0].day.condition.text,
        hourly
    };

    return (
        <div className="weather-container-wrapper">
            <div className="weather-container">
                <div className="weather-header">
                    <h2>{weatherDetails.city}</h2>
                    <h3>{weatherDetails.country}</h3>
                    <h3>{weatherDetails.dateTime}</h3>
                </div>

                <div className="weather-main">
                    <h1>{weatherDetails.temp}</h1>
                    <h2>{weatherDetails.text}</h2>
                </div>

                <div className="weather-info">
                    <div className="column">
                        <h3 className='weather-info-title'>Precipitation</h3>
                        <h3 className='weather-info-details'>{weatherDetails.precipitation}%</h3>
                    </div>
                    <div className="column">
                        <h3 className='weather-info-title'>Humidity</h3>
                        <h3 className='weather-info-details'>{weatherDetails.humidity} mm</h3>
                    </div>
                    <div className="column">
                        <h3 className='weather-info-title'>Wind</h3>
                        <h3 className='weather-info-details'>{weatherDetails.wind} km/h</h3>
                    </div>
                </div>

                <div className="weather-hourly">
                    {weatherDetails.hourly.map((hour, index) => (
                        <div key={index}>
                            <h3 className='weather-hourly-title'>{hour.time}</h3>
                            <h3 className='weather-hourly-temp'>{hour.temp}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Weather;
