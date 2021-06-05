import { useEffect, useState } from 'react';
import { loadOpenWeatherMapData } from './data/openWeatherMapAPI';
import { getWeatherForToday, getWeatherForecast } from './data/weatherData';

export const useWeather = () => {
  const [currentCity, setCurrentCity] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    if (currentCity) {
      loadOpenWeatherMapData(currentCity)
        .then(data => {
          const { message, code } = data;

          if (code !== '200' && message) throw Error(message);

          setError(null);
          setWeatherData({
            today: getWeatherForToday(data.list),
            forecast: getWeatherForecast(data.list),
            currentCity,
          });
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [currentCity]);

  return {
    currentCity,
    setCurrentCity,
    error,
    isLoading,
    weatherData,
  };
};
