import React, { useState } from 'react';

const URL = 'https://api.adviceslip.com/advice';

function SearchAdvice() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTotalResults, setSearchTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [adviceSearchQuery, setAdviceSearchQuery] = useState('');

  function loadSearchDataFromAPI(query) {
    const url = getSearchQueryUrl(query);

    return fetch(url).then(response => {
      if (response.ok) {
        const result = response.json();
        return result;
      } else {
        return { errorStatusCode: response.status, errorMessage: response.statusText };
      }
    });
  }

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

  function getSearchQueryUrl(query) {
    return `${URL}/search/${query}`;
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      loadSearchDataByQuery(event.target.value);
    }
  };

  function handleChange(event) {
    setAdviceSearchQuery(event.target.value);
    if (!adviceSearchQuery) {
      setSearchResults([]);
      setSearchTotalResults(0);
      setSearchError('');
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
