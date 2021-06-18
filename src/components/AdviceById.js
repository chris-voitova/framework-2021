import React, { useState, useEffect } from 'react';
import { loadAdviceByIdData } from '../data/openAdviceAPI';
import { getRandomNumber } from '../utils';

function AdviceById() {
  const [error, setError] = useState(null);
  const [randomNumber, setRandomNumber] = useState(1);
  const [timerActive, setTimerActive] = useState(true);
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(0);

  function loadAdviceById(id) {
    loadAdviceByIdData(id)
      .then(response => {
        const result = JSON.parse(response + '}');
        const {
          slip: { id, advice: fetchedAdvice },
          errorStatusCode,
          errorMessage,
        } = result;
        if (errorStatusCode) {
          setError(errorMessage);
          throw Error(errorMessage);
        }
        setAdvice(fetchedAdvice);
        setAdviceId(id);
      })
      .catch(setError);
  }

  useEffect(() => {
    if (timerActive) {
      const timeout = setTimeout(setRandomNumber, 1000, getRandomNumber());
      return () => clearTimeout(timeout);
    }
  }, [randomNumber, timerActive]);

  function handleClick() {
    setTimerActive(!timerActive);
    loadAdviceById(randomNumber);
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
