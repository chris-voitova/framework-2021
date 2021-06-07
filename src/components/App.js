/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import SearchByCity from './SearchByCity';
import RandomAdvice from './RandomAdvice';
import SearchAdvice from './SearchAdvice';
import WeatherResults from './WeatherResults';
import Checkbox from './Checkbox';

export default function App() {
  return (
    <>
      {/* <SearchByCity /> */}
      <RandomAdvice />
      <SearchAdvice />
      {/* <Checkbox
        label="next days forecast - at noon only"
        onChange={e => setForecastPeriodicity(e.target.value)}
      /> */}
      {/* <WeatherResults /> */}
    </>
  );
}

function setForecastPeriodicity(isAtNoonOnly) {
  window.dataStore.isAtNoonOnly = isAtNoonOnly;
}
