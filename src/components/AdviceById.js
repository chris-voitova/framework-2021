import React, { useState, useEffect } from 'react';

const URL = 'https://api.adviceslip.com/advice';
function getIdQueryUrl(id) {
  return `${URL}/${id}`;
}

function loadAdviceData(id) {
  const url = getIdQueryUrl(id);
  return fetch(url).then(response => {
    if (response.ok) {
      const result = response.text();
      return result;
    } else {
      return { errorStatusCode: response.status, errorMessage: response.statusText };
    }
  });
}

function AdviceById() {
  const [error, setError] = useState(null);
  const [randomNumber, setRandomNumber] = useState(1);
  const [timerActive, setTimerActive] = useState(true);
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(0);

  function loadAdvice(id) {
    loadAdviceData(id)
      .then(response => {
        const result = JSON.parse(response + '}');
        const {
          slip: { id, advice: fetchedAdvice },
          errorStatusCode,
          errorMessage,
        } = result;
        //   console.log(fetchedAdvice, id);
        if (errorStatusCode) {
          setError(errorMessage);
          throw Error(errorMessage);
        }
        setAdvice(fetchedAdvice);
        setAdviceId(id);
      })
      .catch(setError);
  }

  function getRandomNumber() {
    var maxNumber = 100;
    return Math.floor(Math.random() * maxNumber + 1);
  }

  useEffect(() => {
    if (timerActive) {
      const timeout = setTimeout(setRandomNumber, 1000, getRandomNumber());
      return () => clearTimeout(timeout);
    }
  }, [randomNumber, timerActive]);

  function handleClick() {
    setTimerActive(!timerActive);
    loadAdvice(randomNumber);
  }

  return (
    <>
      <div>Click on the number to stop random and get advice</div>
      <div onClick={() => handleClick()}>{randomNumber}</div>
      <div>
        {adviceId ? (
          <>
            <div>advice for your magic number {adviceId}:</div>
            <div>{advice}</div>
            <div>If you want to get new advice - click again on the numbers</div>
          </>
        ) : null}
      </div>
    </>
  );
}
export default AdviceById;
