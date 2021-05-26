// import { CELSIUS_UNITS } from './utils';

const URL = 'https://api.adviceslip.com/advice';

const dataStore = (window.dataStore = {
  advice: '',
  dataIsLoading: false,
  searchResults: [],
  searchTotalResults: null,
  adviceSearchQuery: '',
});

async function fetchRandomAdvice() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json();
      const advice = json.slip.advice;
      dataStore.dataIsLoading = true;
      renderApp();
      if (dataStore.advice !== advice) {
        dataStore.advice = advice;
        dataStore.dataIsLoading = false;
        renderApp();
      } else {
        setTimeout(fetchRandomAdvice, 1000);
      }
    }
  } catch {
    dataStore.advice = 'oops :( the universe has no advice';
    renderApp();
    throw Error(response.statusText);
  }
}
async function fetchAdviceBySearchQuery(query) {
  const searchUrl = `${URL}/search/${query}`;
  dataStore.searchResults = [];
  dataStore.searchTotalResults = null;
  try {
    const response = await fetch(searchUrl);
    if (response.ok) {
      renderApp();
      const json = await response.json();
      const searchResults = json.slips;
      if (searchResults) {
        searchResults.forEach(({ id, advice }) => dataStore.searchResults.push({ id, advice }));
      }
      dataStore.searchTotalResults = dataStore.searchResults.length;
      renderApp();
    }
  } catch {
    renderApp();
    throw Error(response.statusText);
  }
}

function getRandomAdvice() {
  return `
	 <button ${dataStore.dataIsLoading ? 'disabled' : ''}
	 onclick="window.fetchRandomAdvice()">Universe give me advice!</button>
	 <br>
	 <br>
	 <div>${dataStore.dataIsLoading ? 'doing magic' : dataStore.advice}</div>
	 <br>
	`;
}

function totalSearchResults() {
  if (dataStore.searchTotalResults) {
    return `<div>found : ${dataStore.searchTotalResults} </div>`;
  } else if (dataStore.searchTotalResults === null) {
    return ``;
  } else {
    return `<div>advices not found</div>`;
  }
}

function renderSearch() {
  dataStore.adviceSearchQuery = this.value;
  window.fetchAdviceBySearchQuery(dataStore.adviceSearchQuery);
  window.renderApp();
}

function searchAdvice() {
  return `
	  <input
			type="text"
			value="${dataStore.adviceSearchQuery}"
			onchange="window.renderSearch.call(this)" 
			class="input"
	  />
	  <br>
	  ${!dataStore.adviceSearchQuery ? `<div>Please search advice by word</div><br>` : ''}
	  ${totalSearchResults()}
	  <br>
	  ${
      dataStore.searchResults
        ? `${dataStore.searchResults.map(({ advice }) => `<div>${advice}</div><br>`).join('')}`
        : ''
    }
 `;
}

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function App() {
  return `
  <div>
    ${getRandomAdvice()}
    ${searchAdvice()}
  </div>`;
}

window.renderApp = renderApp;
window.fetchRandomAdvice = fetchRandomAdvice;
window.fetchAdviceBySearchQuery = fetchAdviceBySearchQuery;
window.renderSearch = renderSearch;

renderApp();
