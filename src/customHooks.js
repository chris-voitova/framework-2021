import { useEffect, useState } from './framework';
import { loadAdviceData } from './data/openWeatherMapAPI';
import { getWeatherForToday, getWeatherForecast } from './data/weatherData';

export const useWeather = () => {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    loadAdviceData()
      .then(({ slip: { advice: fetchedAdvice }, errorStatusCode, errorMessage }) => {
        //   console.log(fetchedAdvice);
        if (errorStatusCode) throw Error(errorMessage);
        setError(null);
        setAdvice(fetchedAdvice);
        setIsLoading(false);
        console.log(advice);
        //   if (advice !== fetchedAdvice) {
        //     setAdvice(fetchedAdvice);
        //     setIsLoading(false);
        //   } else {
        //     setTimeout(loadAdviceData, 1000);
        //   }
        setWeatherData({
          today: getWeatherForToday(data.list),
          forecast: getWeatherForecast(data.list),
        });
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    error,
    isLoading,
    weatherData,
  };
};

// import { useEffect, useState } from './framework';
// import { loadOpenWeatherMapData } from './data/openWeatherMapAPI';
// import { getWeatherForToday, getWeatherForecast } from './data/weatherData';

// export const useWeather = () => {
//   const [currentCity, setCurrentCity] = useState('');
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [weatherData, setWeatherData] = useState({});

//   useEffect(() => {
//     if (currentCity) {
//       loadOpenWeatherMapData(currentCity)
//         .then(data => {
//           const { message, code } = data;

//           if (code !== '200' && message) throw Error(message);

//           setError(null);
//           setWeatherData({
//             today: getWeatherForToday(data.list),
//             forecast: getWeatherForecast(data.list),
//             currentCity,
//           });
//         })
//         .catch(setError)
//         .finally(() => setIsLoading(false));
//     }
//   }, [currentCity]);

//   return {
//     currentCity,
//     setCurrentCity,
//     error,
//     isLoading,
//     weatherData,
//   };
// };
