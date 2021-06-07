import { URL, getSearchQueryUrl, loadOpenWeatherMapData } from './openWeatherMapAPI';
import renderApp from '../framework/render';

export async function fetchRandomAdvice() {
  let { advice } = window.dataStore;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json();
      const fetchedAdvice = json.slip.advice;
      window.dataStore.dataIsLoading = true;
      renderApp();
      if (advice !== fetchedAdvice) {
        window.dataStore.advice = fetchedAdvice;
        window.dataStore.dataIsLoading = false;
        renderApp();
      } else {
        setTimeout(fetchRandomAdvice, 1000);
      }
    }
  } catch {
    window.dataStore.error = 'Some error occurred.';
    renderApp();
    throw Error(response.statusText);
  }
}
export async function fetchAdviceBySearchQuery(query) {
  const searchUrl = getSearchQueryUrl(query);
  window.dataStore.searchResults = [];
  window.dataStore.searchTotalResults = null;
  try {
    const response = await fetch(searchUrl);
    if (response.ok) {
      renderApp();
      const json = await response.json();
      const searchResults = json.slips;
      if (searchResults) {
        searchResults.forEach(({ id, advice }) =>
          window.dataStore.searchResults.push({ id, advice }),
        );
      }
      window.dataStore.searchTotalResults = window.dataStore.searchResults.length;
      renderApp();
    }
  } catch {
    window.dataStore.searchError = 'Some error occurred.';
    renderApp();
    throw Error(response.statusText);
  }
}
