import React, { useState, useEffect } from 'react';

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

function RandomAdvice() {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
      setSeconds(5);
    }
  }, [seconds, timerActive]);

  function handleButtonClicked() {
    setDisabled(true);
    setTimeout(() => setTimerActive(!timerActive), 1000);
    loadAdvice();
    setTimeout(() => setDisabled(false), 6000);
  }

  function loadAdvice() {
    loadAdviceData()
      .then(({ slip: { advice: fetchedAdvice }, errorStatusCode, errorMessage }) => {
        if (errorStatusCode) {
          setError(errorMessage);
          throw Error(errorMessage);
        }
        console.log(fetchedAdvice);
        setAdvice(fetchedAdvice);
      })
      .catch(setError);
  }

  return (
    <>
      <button onClick={() => handleButtonClicked()} disabled={disabled}>
        Get Advice
      </button>
      <div>{advice}</div>
      {timerActive && <div>Time to generating new advice: {seconds}</div>}
    </>
  );
}
export default RandomAdvice;
