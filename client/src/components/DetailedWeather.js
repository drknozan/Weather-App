import React from 'react';

const DetailedWeather = ({ weatherData }) => {
    return(
        <div className='detailed-weather'>
            <h3>Coordinates Lat: {weatherData.lat} Lon: {weatherData.lon}</h3>
            <h3>Humidity: {weatherData.humidity} %</h3>
            <h3>Feels Like: {weatherData.feels_like} &#8451;</h3>
            <h3>Minimum Temperature: {weatherData.temp_min} &#8451;</h3>
            <h3>Maximum Temperature: {weatherData.temp_max} &#8451;</h3>
            <h3>Pressure: {weatherData.pressure} hPa</h3>
        </div>
    );
}

export default DetailedWeather