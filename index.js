// import { CELSIUS_UNITS } from './utils';

const URL = 'https://api.adviceslip.com/advice';

const dataStore = (window.dataStore = {
  advice: '',
  dataIsLoading: false,
  searchResults: [],
  searchTotalResult: 0,
  adviceSearchQuery: '',
});

async function getAdvice() {
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
        setTimeout(getAdvice, 1000);
      }
    }
  } catch {
    dataStore.advice = 'oops :( the universe has no advice';
    renderApp();
    throw Error(response.statusText);
  }
}
async function getAdviceByQuery(query) {
  const searchUrl = `${URL}/search/${query}`;
  console.log(dataStore.adviceSearchQuery);
  try {
    const response = await fetch(searchUrl);
    if (response.ok) {
      dataStore.dataIsLoading = true;
      renderApp();
      const json = await response.json();
      dataStore.searchResults = json.slips;
      console.log(dataStore.searchResults);
      dataStore.searchTotalResult = json.total_results;
      dataStore.dataIsLoading = false;
      renderApp();
    }
  } catch {
    //  dataStore.searchResults = 'oops :( the universe has no advice';
    //  renderApp();
    throw Error(response.statusText);
  }
}
// getAdviceByQuery(dataStore.adviceSearchQuery);

function getRandomAdvice() {
  return `
	 <button ${dataStore.dataIsLoading ? 'disabled' : ''}
	 onclick="window.getAdvice()">Universe give me advice!</button>
	 <br>
	 <br>
	 <div>${dataStore.dataIsLoading ? 'doing magic' : dataStore.advice}</div>
	`;
}

function searchAdvice() {
  return `
	  <input
			type="text"
			value="${dataStore.adviceSearchQuery}"
			onchange="dataStore.adviceSearchQuery = this.value; window.getAdviceByQuery(dataStore.adviceSearchQuery); window.renderApp();" 
	  />
	  ${!dataStore.adviceSearchQuery ? `Search advice` : ''}
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
window.getAdvice = getAdvice;
window.getAdviceByQuery = getAdviceByQuery;

renderApp();
