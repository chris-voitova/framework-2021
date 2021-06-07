export const URL = 'https://api.adviceslip.com/advice';

export function getSearchQueryUrl(query) {
  return `${URL}/search/${query}`;
}
