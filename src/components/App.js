import React, { useState, useEffect } from 'react';
import { useWeather } from '../customHooks';
import { AppContext } from '../context';
import RandomAdvice from './RandomAdvice';
import WeatherResults from './WeatherResults';

function App() {
  return (
    <>
      <RandomAdvice />
    </>
  );
}

// export default App;

// function App() {
//   const { currentCity, setCurrentCity, error, isLoading, weatherData } = useWeather();

//   return (
//     <>
//       <SearchByCity value={currentCity} onBlur={setCurrentCity} />
//       <AppContext.Provider value={weatherData}>
//         {!currentCity ? (
//           <div>Search by city name</div>
//         ) : (
//           <WeatherResults error={error} isLoading={isLoading} />
//         )}
//       </AppContext.Provider>
//     </>
//   );
// }

// export default App;

export default App;
