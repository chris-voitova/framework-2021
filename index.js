const URL = 'https://api.adviceslip.com/advice';

async function getAdvice() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json();
      const advice = json.slip.advice;
      renderAdvice(advice);
      return renderAdvice(advice);
    }
  } catch {
    renderAdvice('oops :( Advice fetch failed');
    throw Error(response.statusText);
  }
}

function renderAdvice(message) {
  return `<div class="advice">${message}</div>`;
}

function notAsync() {
  return 'not async data';
}

async function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${await App()}
    `;
}

async function App() {
  return `
  <div>
    ${await getAdvice()}
    ${notAsync()}
  </div>`;
}

window.renderApp = renderApp;

renderApp();
