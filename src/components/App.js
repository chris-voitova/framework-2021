import React from 'react';
import RandomAdvice from './RandomAdvice';
import SearchAdvice from './SearchAdvice';
import AdviceById from './AdviceById';

function App() {
  return (
    <>
      <RandomAdvice />
      <SearchAdvice />
      <AdviceById />
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
