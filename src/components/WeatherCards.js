import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputComponent from './SearchBar';

export default function WeatherCards() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {

        const SearchExample = () => {
            const [query, setQuery] = useState('');          
            const handleSearch = (event) => {
              const value = event.target.value;
              setQuery(value);
        
          
              setFilteredData(filteredResults);
            };
          
            return (
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={handleSearch}
                /></div>
            )
        }

        // ----------------------------------
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${value}?unitGroup=metric&key=9473YWA7395BR843UM9T8XU7H&contentType=json`;
        
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
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !weatherData) {
        return <p>Error loading data</p>;
    }

    const { address, currentConditions } = weatherData;
    const { temp, conditions } = currentConditions;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{address}</Card.Title>
                    <Card.Text>
                        Temperature: {temp}°C<br />
                        Conditions: {conditions}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
