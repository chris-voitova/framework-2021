/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { fetchAdviceBySearchQuery } from '../data/weatherData';
import renderApp from '../framework/render';

function totalSearchResults() {
  const { searchTotalResults, searchError } = window.dataStore;
  if (searchTotalResults) {
    return <div>found : {searchTotalResults}</div>;
  } else if (searchTotalResults === null || searchError) {
    return null;
  } else {
    return <div>advices not found</div>;
  }
}

function renderSearch(value) {
  window.dataStore.adviceSearchQuery = value;
  fetchAdviceBySearchQuery(window.dataStore.adviceSearchQuery);
  renderApp();
}

function SearchAdvice() {
  const { adviceSearchQuery, searchResults, searchError } = window.dataStore;
  return (
    <>
      <input
        type="text"
        value={adviceSearchQuery}
        onChange={event => renderSearch(event.target.value)}
        class="input"
      />
      <br />
      {!adviceSearchQuery ? (
        <>
          <div>Please search advice by word</div>
          <br />
        </>
      ) : null}
      {totalSearchResults()}
      <br />
      {searchResults
        ? searchResults.map(({ advice }) => (
            <>
              <div>{advice}</div>
              <br />
            </>
          ))
        : null}
      {searchError}
    </>
  );
}

export default SearchAdvice;
