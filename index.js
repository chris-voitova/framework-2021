// import { CELSIUS_UNITS } from './utils';

const URL = 'https://api.adviceslip.com/advice';

window.dataStore = {
  advice: '',
  isLoading: '',
};

async function getAdvice() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json();
      const advice = json.slip.advice;
      if (window.dataStore.advice !== advice) {
        window.dataStore.advice = advice;
      } else {
        getAdvice();
        //   setTimeout(getAdvice, 500);
      }
      renderApp();
    }
  } catch {
    window.dataStore.advice = 'oops :( the universe has no advice';
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
   <button onclick="window.getAdvice()">Universe give me advice!</button>
	<br>
	<br>
	<div>${window.dataStore.isLoading}</div>
	${renderAdvice(window.dataStore.advice)}
  `;
}

renderApp();
