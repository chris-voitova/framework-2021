/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { fetchRandomAdvice } from '../data/weatherData';

function RandomAdvice() {
  let { dataIsLoading, advice, adviceError } = window.dataStore;
  return (
    <>
      <button disabled={dataIsLoading} onClick={fetchRandomAdvice}>
        Universe give me advice!
      </button>
      <br />
      <br />
      <div>
        {dataIsLoading ? (
          'doing magic'
        ) : (
          <>
            {advice}
            {adviceError}
          </>
        )}
      </div>
      <br />
    </>
  );
}

export default RandomAdvice;
