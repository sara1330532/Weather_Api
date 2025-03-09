import { useState, useEffect } from 'react'
import axios from 'axios';

import Weather from './Weather'
import './OurApp.css'
import logo from './assets/logo.svg'

const OurApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [weather_yes, setWeather_yes] = useState(null);

    const BASE_URL = "http://localhost:5000/api/weather"
    const showWeather = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(BASE_URL + "?city=" + city);
            if (res.data) {
                setWeather(res.data);
                setError(null);
            }
            else {
                setError("No data available for this city");
            }
        }
        catch (error) {
            setError("Error! can't get weather - data from api" + error)
        }
    }

    return (
        <>
            <div className="content-container">
                <img src={logo} alt="App Logo" className="logo" width={100} height={100} />

                <div className='container'>
                    <p className='text'>
                        Use our weather app <br />
                        to see the weather<br />
                        around the world<br />
                    </p>
                    <form onSubmit={showWeather}>
                        <div className="label-text">City name</div>
                        <div className='div-container'>
                            <label className='label-container'>
                                <input
                                    type="text"
                                    value={city}
                                    name="City"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                            <button type='submit'>Check</button>
                        </div>
                    </form>
                </div>
                <Weather data={weather} />
            </div>
            {error && <div>{error}</div>}
        </>
    )
}

export default OurApp;
