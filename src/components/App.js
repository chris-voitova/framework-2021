/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useEffect, useState } from '../framework';
import { useWeather } from '../customHooks';
import { AppContext } from '../context';
import SearchByCity from './SearchByCity';
import WeatherResults from './WeatherResults';

function loadAdviceData() {
  const url = 'https://api.adviceslip.com/advice';
  return fetch(url).then(response => {
    //  console.log(response);
    if (response.ok) {
      const result = response.json();
      return result;
    } else {
      return { errorStatusCode: response.status, errorMessage: response.statusText };
    }
  });
}

function App() {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function loadAdvice() {
    //  if (isLoading) {
    loadAdviceData()
      .then(({ slip: { advice: fetchedAdvice }, errorStatusCode, errorMessage }) => {
        if (errorStatusCode) throw Error(errorMessage);
        setError(null);
        console.log(fetchedAdvice);
        if (advice !== fetchedAdvice) {
          setAdvice(fetchedAdvice);
          //  setIsLoading(false);
        } else {
          loadAdvice();
          // setIsLoading(true);
        }
        setWeatherData({
          today: getWeatherForToday(data.list),
          forecast: getWeatherForecast(data.list),
        });
      })
      .catch(setError);
    //   .finally(() => setIsLoading(false));
    //  }
  }

  //   useEffect(() => {
  //     loadAdvice();
  //   }, []);

  return (
    <>
      <button onClick={() => loadAdvice()}>test</button>
      <div>{advice}</div>
    </>
  );
}

export default App;
