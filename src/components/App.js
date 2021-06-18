import React from 'react';
import RandomAdvice from './RandomAdvice';
import SearchAdvice from './SearchAdvice';
import AdviceById from './AdviceById';

function App() {
  return (
    <>
      <RandomAdvice />
      <hr />
      <SearchAdvice />
      <hr />
      <AdviceById />
    </>
  );
}

export default App;
