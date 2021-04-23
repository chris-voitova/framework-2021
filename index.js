// Start from here

const URL = 'https://api.adviceslip.com/advice';
const ADVICE_CONTAINER = document.querySelector('.advice-container');

const showMessage = message => `<p class="message">${message}</p>`;

async function getAdvice() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.json();
      return (ADVICE_CONTAINER.innerHTML += json.slip.advice);
    }
  } catch {
    ADVICE_CONTAINER.innerHTML += showMessage('oops :( Advice fetch failed');
    throw Error(response.statusText);
  }
}
getAdvice();
