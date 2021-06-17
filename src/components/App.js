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
const delay = 1;

function App() {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleButtonClicked() {
    setDisabled(true);
    setTimeout(() => setDisabled(() => false), 3000);
  }

  function loadAdvice() {
    loadAdviceData()
      .then(({ slip: { advice: fetchedAdvice }, errorStatusCode, errorMessage }) => {
        if (errorStatusCode) throw Error(errorMessage);
        setError(null);
        console.log(fetchedAdvice);
        setAdvice(fetchedAdvice);
      })
      .catch(setError)
      .finally(() => setIsButtonDisabled(false));
  }

  return (
    <>
      <button onClick={() => handleButtonClicked()} disabled={disabled}>
        test
      </button>
      <div>{advice}</div>
      <div>{disabled}</div>
    </>
  );
}

export default App;
