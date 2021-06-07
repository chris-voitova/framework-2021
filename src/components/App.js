/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import RandomAdvice from './RandomAdvice';
import SearchAdvice from './SearchAdvice';
import Checkbox from './Checkbox';

export default function App() {
  return (
    <>
      <RandomAdvice />
      <SearchAdvice />
      {/* <Checkbox
        label="next days forecast - at noon only"
        onChange={e => setForecastPeriodicity(e.target.value)}
      /> */}
    </>
  );
}

function setForecastPeriodicity(isAtNoonOnly) {
  window.dataStore.isAtNoonOnly = isAtNoonOnly;
}
