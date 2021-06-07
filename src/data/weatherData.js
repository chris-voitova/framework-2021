import { URL, getSearchQueryUrl, loadOpenWeatherMapData } from './openWeatherMapAPI';
import renderApp from '../framework/render';

export function getCurrentCityWeatherData() {
  const { currentCity, cityByWeather } = window.dataStore;
  // no ?. operator in parcel-bundler version used 😢
  return cityByWeather[currentCity] ? cityByWeather[currentCity].list : undefined;
}

export function isCurrentCityDataLoaded() {
  const { currentCity, cityByWeather } = window.dataStore;
  return cityByWeather.hasOwnProperty(currentCity);
}

export function validateAndLoadData() {
  const { currentCity } = window.dataStore;

  if (!isCurrentCityDataLoaded()) {
    return loadOpenWeatherMapData(currentCity).then(data => ({ data }));
  }

  // no errors and no new data loaded, app will take data from cache
  return Promise.resolve({});
}

export function performSearch(cityName) {
  window.dataStore.currentCity = cityName;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;
  renderApp();
  validateAndLoadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;

      const errorFromAPI = data.code !== '200' && data.message;
      if (error || errorFromAPI) {
        // no ?? operator in parcel-bundler version used 😢
        window.dataStore.error = error || data.message;
      } else if (data) {
        window.dataStore.cityByWeather[cityName] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(renderApp);
}

export function getFilteredByDateWeatherData(
  weatherDataList,
  { includeDatesAfterBase = false, includeBaseDate = false, baseDate = new Date() },
) {
  const baseDateDay = baseDate.getDate();
  return weatherDataList.filter(({ dt }) => {
    const itemDate = new Date(dt * 1000);

    const itemDateDay = itemDate.getDate();
    const isToday = baseDateDay === itemDateDay;
    if (includeBaseDate && isToday) {
      return true;
    }

    return includeDatesAfterBase && baseDate < itemDate && !isToday;
  });
}

//
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
    window.dataStore.advice = 'oops :( the universe has no advice';
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
    renderApp();
    throw Error(response.statusText);
  }
}
