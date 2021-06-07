import { CELSIUS_UNITS } from '../utils';

const dataStore = {
  currentCity: '',
  isDataLoading: false,
  cityByWeather: {},
  currentUnits: CELSIUS_UNITS,
  //
  advice: '',
  dataIsLoading: false,
  searchResults: [],
  searchTotalResults: null,
  adviceSearchQuery: '',
  error: null,
};

export default dataStore;
