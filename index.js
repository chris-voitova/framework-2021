// import { CELSIUS_UNITS } from './utils';

const URL = 'https://api.adviceslip.com/advice';

const dataStore = (window.dataStore = {
  advice: '',
  dataIsLoading: false,
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

function renderAdvice(message) {
  return `<div class="advice">${message}</div>`;
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
  </div>`;
}

window.renderApp = renderApp;
window.getAdvice = getAdvice;

function getRandomAdvice() {
  return `
   <button ${dataStore.dataIsLoading ? 'disabled' : ''}
	onclick="window.getAdvice()">Universe give me advice!</button>
	<br>
	<br>
	<div>${dataStore.dataIsLoading ? 'doing magic' : renderAdvice(dataStore.advice)}</div>
  `;
}

renderApp();
