export const URL = 'https://api.adviceslip.com/advice';

export const getIdQueryUrl = id => `${URL}/${id}`;

export const getSearchQueryUrl = query => `${URL}/search/${query}`;

export function loadAdviceByIdData(id) {
  const url = getIdQueryUrl(id);
  return fetch(url).then(response => {
    if (response.ok) {
      const result = response.text();
      return result;
    } else {
      return { errorStatusCode: response.status, errorMessage: response.statusText };
    }
  });
}

export function loadAdviceData() {
  return fetch(URL).then(response => {
    if (response.ok) {
      const result = response.json();
      return result;
    } else {
      return { errorStatusCode: response.status, errorMessage: response.statusText };
    }
  });
}

export function loadSearchDataFromAPI(query) {
  const url = getSearchQueryUrl(query);

  return fetch(url).then(response => {
    if (response.ok) {
      const result = response.json();
      return result;
    } else {
      return { errorStatusCode: response.status, errorMessage: response.statusText };
    }
  });
}
