import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/WeatherCards.css';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export default function WeatherCards() {
    const [weatherData, setWeatherData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!submittedValue) return;

        setLoading(true);
        setError(false);

        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${submittedValue}?unitGroup=metric&key=9473YWA7395BR843UM9T8XU7H&contentType=json`;

        axios.get(apiUrl)
            .then(response => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(true);
                setLoading(false);
            });
    }, [submittedValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedValue(inputValue);
    };

    const showIcon = () => {
        if (weatherData.currentConditions.conditions.includes('Clear')) {
            return <WbSunnyIcon  style={{fontSize:'70',color:'yellow'}}/>;
        }
        if (weatherData.currentConditions.conditions.includes('Rain')) {
            return <ThunderstormIcon  style={{fontSize:'70'}}/>;
        }
        if (weatherData.currentConditions.conditions.includes('Partially cloudy')) {
            return <Brightness6Icon  style={{fontSize:'70'}}/>;
        }
        if (weatherData.currentConditions.conditions.includes('Cloudy')) {
            return <CloudIcon style={{fontSize:'70'}} />;
        }
    };

    return (
        <div className='weather-background'>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter city name"
                />
                <Button variant="primary" type="submit" style={{ marginLeft: '5px' }}>Submit</Button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error loading data</p>}
            {weatherData && (
                <div className='cards' style={{ borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>{weatherData.address}</h1>
                    <br />
                    <h5>Temperature: {weatherData.currentConditions.temp}°C</h5>
                    <h5>Conditions: {weatherData.currentConditions.conditions}</h5>
                    <h5>Feels Like:{weatherData.currentConditions.feelslike}</h5>
                    <h5>Humidity:{weatherData.currentConditions.humidity}</h5>
                    {showIcon()}
                </div>


            )}
        </div>
    );
}
