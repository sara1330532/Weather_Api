//This React component displays detailed weather information, including temperature, wind, humidity, and precipitation.
// It also shows the weather forecast for the past few hours based on API data.
import '../style/Weather.css'

const Weather = ({ data }) => {

//If we did not receive information from the server,
// we will display an empty div.
    if (!data) {
        return (
            <div className="weather-container-wrapper">

            </div>
        );
    }
    let date = new Date(data.location.localtime)
    let hours = date.getHours();
    let arrHours = data.forecast.forecastday[0].hour;

    //This function accepts a date and returns it in a different format.
    const formatDateAndTime = (time) => {
        if (!time) return "לא זמין";
        const day = String(time.getDate()).padStart(2, '0');
        const month = String(time.getMonth() + 1).padStart(2, '0');
        const year = time.getFullYear();
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} at ${hours}:${minutes}`;
    };
    //This function accepts a date and extracts the hour and minutes from it.
    const setHoursAndMinutes = (time) => {
        return time ? time.substring(11, 16) : "";
    };
    const weather_detalis = {
        city: data.location.name,
        country: data.location.country,
        dateTime: formatDateAndTime(date),
        tamp: Math.floor(parseFloat(data.current.temp_c)) + "°",
        wind: data.current.wind_mph,
        humidity: data.current.humidity,
        precipitation: data.current.precip_mm,
        text: data.forecast.forecastday[0].day.condition.text,
        hour1Time: hours - 1 >= 0 ? setHoursAndMinutes(arrHours[hours - 1].time) : "",
        hour2Time: hours - 2 >= 0 ? setHoursAndMinutes(arrHours[hours - 2].time) : "",
        hour3Time: hours - 3 >= 0 ? setHoursAndMinutes(arrHours[hours - 3].time) : "",
        hour4Time: setHoursAndMinutes(arrHours[hours].time),
        hour5Time: hours + 1 < arrHours.length ?
            setHoursAndMinutes(arrHours[hours + 1].time) :
            setHoursAndMinutes(data.forecast.forecastday[1].hour[0].time),
        hour1Temp: hours - 1 >= 0 ? Math.floor(parseFloat(arrHours[hours - 1].temp_c ))+ "°" : "",
        hour2Temp: hours - 2 >= 0 ? Math.floor(parseFloat(arrHours[hours - 2].temp_c ))+ "°" : "",
        hour3Temp: hours - 3 >= 0 ? Math.floor(parseFloat(arrHours[hours - 3].temp_c ))+ "°" : "",
        hour4Temp: Math.floor(parseFloat(arrHours[hours].temp_c ))+ "°",
        hour5Temp: hours + 1 < arrHours.length ?
        Math.floor(parseFloat(arrHours[hours + 1].temp_c)) + "°" :
        Math.floor(parseFloat(data.forecast.forecastday[1].hour[0].temp_c)),

    }

    return (
        <>
            <div className="weather-container-wrapper">
                <div className="weather-container">
                    <div className="weather-header">
                        <h2>{weather_detalis.city}</h2>
                        <h3>{weather_detalis.country}</h3>
                        <h3>{weather_detalis.dateTime}</h3>
                    </div>

                    <div className="weather-main">
                        <h1>{weather_detalis.tamp}</h1>
                        <h2>{weather_detalis.text}</h2>
                    </div>

                    <div className="weather-info">
                        <div className="column">
                            <h3 className='weather-info-title'>Precipitation</h3>
                            <h3 className='weather-info-details'>{weather_detalis.precipitation}%</h3>
                        </div>
                        <div className="column">
                            <h3 className='weather-info-title'>Humidity</h3>
                            <h3 className='weather-info-details'>{weather_detalis.humidity} mm</h3>
                        </div>
                        <div className="column">
                            <h3 className='weather-info-title'>Wind</h3>
                            <h3 className='weather-info-details'>{weather_detalis.wind} km/h</h3>
                        </div>
                    </div>

                    <div className="weather-hourly">
                        <div>
                            <h3 className='weather-hourly-title'>{weather_detalis.hour1Time}</h3>
                            <h3 className='weather-hourly-temp'>{weather_detalis.hour1Temp}</h3>
                        </div>
                        <div>
                            <h3 className='weather-hourly-title'>{weather_detalis.hour2Time}</h3>
                            <h3 className='weather-hourly-temp'>{weather_detalis.hour2Temp}</h3>
                        </div>
                        <div>
                            <h3 className='weather-hourly-title'>{weather_detalis.hour3Time}</h3>
                            <h3 className='weather-hourly-temp'>{weather_detalis.hour3Temp}</h3>
                        </div>
                        <div>
                            <h3 className='weather-hourly-title'>{weather_detalis.hour4Time}</h3>
                            <h3 className='weather-hourly-temp'>{weather_detalis.hour4Temp}</h3>
                        </div>
                        <div>
                            <h3 className='weather-hourly-title'>{weather_detalis.hour5Time}</h3>
                            <h3 className='weather-hourly-temp'>{weather_detalis.hour5Temp}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Weather