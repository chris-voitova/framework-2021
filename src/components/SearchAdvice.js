import React, { useState } from 'react';

import { loadSearchDataFromAPI } from '../data/openWeatherMapAPI';

function SearchAdvice() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTotalResults, setSearchTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [adviceSearchQuery, setAdviceSearchQuery] = useState('');

  function loadSearchDataByQuery(query) {
    loadSearchDataFromAPI(query)
      .then(({ slips: fetchedSearchResults, errorStatusCode, errorMessage }) => {
        if (errorStatusCode) {
          setError(errorMessage);
          throw Error(errorMessage);
        }
        setSearchResults([]);
        setSearchTotalResults(0);
        if (fetchedSearchResults) {
          fetchedSearchResults.forEach(({ id, advice }) =>
            setSearchResults(searchResults => [...searchResults, { id, advice }]),
          );
          setSearchTotalResults(fetchedSearchResults.length);
        } else {
          setSearchError('nothing found');
        }
      })
      .catch(setError);
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      loadSearchDataByQuery(event.target.value);
    }
  };

  function resetSearch() {
    setSearchResults([]);
    setSearchTotalResults(0);
    setSearchError('');
  }

  function handleChange(event) {
    setAdviceSearchQuery(event.target.value);
    if (!adviceSearchQuery) {
      resetSearch();
    }
  }

  return (
    <>
      <input
        type="text"
        defaultValue={adviceSearchQuery}
        onChange={event => handleChange(event)}
        onKeyPress={event => handleKeyPress(event)}
        className="input"
      />
      <br />
      {!adviceSearchQuery && (
        <>
          <div>Please search advice by word</div>
          <br />
        </>
      )}
      {adviceSearchQuery && (
        <>
          {searchTotalResults ? <div>found : {searchTotalResults}</div> : null}
          {searchResults &&
            searchResults.map(({ advice, id }) => (
              <div key={id}>
                <div>{advice}</div>
                <br />
              </div>
            ))}
          {searchError}
        </>
      )}
    </>
  );
}

export default SearchAdvice;
