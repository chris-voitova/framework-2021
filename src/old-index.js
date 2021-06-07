// import { CELSIUS_UNITS } from './utils';
import { URL, getSearchQueryUrl } from './data/openWeatherMapAPI';

//
// window.dataStore = {
//   advice: '',
//   dataIsLoading: false,
//   searchResults: [],
//   searchTotalResults: null,
//   adviceSearchQuery: '',
// };

//
// async function fetchRandomAdvice() {
//   try {
//     const response = await fetch(URL);
//     if (response.ok) {
//       const json = await response.json();
//       const advice = json.slip.advice;
//       window.dataStore.dataIsLoading = true;
//       renderApp();
//       if (window.dataStore.advice !== advice) {
//         window.dataStore.advice = advice;
//         window.dataStore.dataIsLoading = false;
//         renderApp();
//       } else {
//         setTimeout(fetchRandomAdvice, 1000);
//       }
//     }
//   } catch {
//     window.dataStore.advice = 'oops :( the universe has no advice';
//     renderApp();
//     throw Error(response.statusText);
//   }
// }
//
// async function fetchAdviceBySearchQuery(query) {
//   const searchUrl = getSearchQueryUrl(query);
//   window.dataStore.searchResults = [];
//   window.dataStore.searchTotalResults = null;
//   try {
//     const response = await fetch(searchUrl);
//     if (response.ok) {
//       renderApp();
//       const json = await response.json();
//       const searchResults = json.slips;
//       if (searchResults) {
//         searchResults.forEach(({ id, advice }) =>
//           window.dataStore.searchResults.push({ id, advice }),
//         );
//       }
//       window.dataStore.searchTotalResults = window.dataStore.searchResults.length;
//       renderApp();
//     }
//   } catch {
//     renderApp();
//     throw Error(response.statusText);
//   }
// }

// function getRandomAdvice() {
//   return `
// 	 <button ${window.dataStore.dataIsLoading ? 'disabled' : ''}
// 	 onclick="window.fetchRandomAdvice()">Universe give me advice!</button>
// 	 <br>
// 	 <br>
// 	 <div>${window.dataStore.dataIsLoading ? 'doing magic' : window.dataStore.advice}</div>
// 	 <br>
// 	`;
// }

function totalSearchResults() {
  if (window.dataStore.searchTotalResults) {
    return `<div>found : ${window.dataStore.searchTotalResults} </div>`;
  } else if (window.dataStore.searchTotalResults === null) {
    return ``;
  } else {
    return `<div>advices not found</div>`;
  }
}

function renderSearch() {
  window.dataStore.adviceSearchQuery = this.value;
  window.fetchAdviceBySearchQuery(window.dataStore.adviceSearchQuery);
  window.renderApp();
}

function searchAdvice() {
  return `
	  <input
			type="text"
			value="${window.dataStore.adviceSearchQuery}"
			onchange="window.renderSearch.call(this)" 
			class="input"
	  />
	  <br>
	  ${!window.dataStore.adviceSearchQuery ? `<div>Please search advice by word</div><br>` : ''}
	  ${totalSearchResults()}
	  <br>
	  ${
      window.dataStore.searchResults
        ? `${window.dataStore.searchResults
            .map(({ advice }) => `<div>${advice}</div><br>`)
            .join('')}`
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
