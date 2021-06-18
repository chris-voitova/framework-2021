import React, { useState, useEffect } from 'react';

const URL = 'https://api.adviceslip.com/advice';

function loadAdviceData() {
  const url = 'https://api.adviceslip.com/advice/1';
  return fetch(url).then(response => {
    if (response.ok) {
      const result = response.text();
      // console.log(response, result);
      return result;
    } else {
      return { errorStatusCode: response.status, errorMessage: response.statusText };
    }
  });
}

function AdviceById() {
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [seconds, setSeconds] = useState(1);
  const [timerActive, setTimerActive] = useState(true);
  const [searchError, setSearchError] = useState('');
  const [advice, setAdvice] = useState('');
  const [disabled, setDisabled] = useState(false);

  function loadAdvice() {
    loadAdviceData()
      .then(response => {
        const jsonResponse = JSON.parse(response + '}');
        console.log(jsonResponse);
        // if (errorStatusCode) {
        //   setError(errorMessage);
        //   throw Error(errorMessage);
        // }
        // setAdvice(fetchedAdvice);
      })
      // .then(data => console.log(JSON.parse(data + '}')))
      .catch(setError);
  }

  //   function getIdQueryUrl(id) {
  //     return `${URL}/${id}`;
  //   }

  function randomNumber() {
    var maxNumber = 100;
    return Math.floor(Math.random() * maxNumber + 1);
  }

  useEffect(() => {
    if (timerActive) {
      const timeout = setTimeout(setSeconds, 1000, randomNumber());
      return () => clearTimeout(timeout);
    }
  }, [seconds, timerActive]);

  function handleClick() {
    setTimerActive(!timerActive);
    console.log(seconds);
    loadAdvice();
  }

  return (
    <>
      <div>Click on the number to stop random and get advice</div>
      <div onClick={() => handleClick()}>{seconds}</div>
      {/* {searchResults &&
        searchResults.map(({ advice, id }) => (
          <div key={id}>
            <div>{advice}</div>
            <br />
          </div>
        ))} */}
      {/* {searchError} */}
      <div>{advice}</div>
    </>
  );
}
export default AdviceById;
