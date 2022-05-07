import React from 'react';
import Rainy from '../img/rainy.png'
import Cloud from '../img/cloudy.png'
import Snow from '../img/snow.png'
import Sunny from '../img/sunny.png'

const CurrentWeather = ({ weatherData }) => {
    return(
        <div className='current-weather'>
            <div className='current-weather-info'>
                <h2>{weatherData.location}</h2>
                <h1>{weatherData.weather}</h1>
                <h3>{Math.floor(weatherData.temp)} &#8451;</h3>
            </div>
            {
                (() => {
                    switch(weatherData.weather) {
                        case 'Clear':
                            return  <img src={Sunny} alt="sunny"/>
                        case 'Clouds':
                            return  <img src={Cloud} alt="cloud"/>
                        case 'Snow':
                            return <img src={Snow} alt="snow"/>
                        case 'Rain':
                            return <img src={Rainy} alt="rain"/>
                        default:
                            return <img src={Sunny} alt="sunny"/>
                    }
                })()
            }
        </div>
    );
}

export default CurrentWeather;