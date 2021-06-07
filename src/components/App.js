/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import RandomAdvice from './RandomAdvice';
import AdviceSearch from './AdviceSearch';
import Checkbox from './Checkbox';

export default function App() {
  return (
    <>
      <RandomAdvice />
      <AdviceSearch />
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
