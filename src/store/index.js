import { createStore } from 'vuex';

const store = createStore({
  state: {
    api_key: 'd4ba12cc464c0543cb84e0675fd71efd',
    url_base: 'https://api.openweathermap.org/data/2.5/',
    query: '',
    weather: {},
    weatherHistory: [],
  },
  mutations: {
    SET_QUERY(state, query) {
      state.query = query;
    },
    SET_WEATHER(state, weather) {
      state.weatherHistory.push({
        name: weather.name,
        country: weather.sys.country,
        temp: weather.main.temp,
        main: weather.weather[0].main,
        humidity: weather.main.humidity,
        speed: weather.wind.speed,
        pressure: weather.main.pressure,
        visibility: weather.visibility
      });
      state.weather = weather;
    },
    REMOVE_LOCATION(state, index) {
      state.weatherHistory.splice(index, 1);
    },
    REORDER_LOCATIONS(state, { oldIndex, newIndex }) {
      const movedLocation = state.weatherHistory.splice(oldIndex, 1)[0];
      state.weatherHistory.splice(newIndex, 0, movedLocation);
    },
    SET_WEATHER_HISTORY(state, history) {
      state.weatherHistory = history;
    }
  },
  actions: {
    async fetchWeather({ state, commit }) {
      try {
        const response = await fetch(`${state.url_base}weather?q=${state.query}&units=metric&APPID=${state.api_key}`);
        const data = await response.json();
        commit('SET_WEATHER', data);
        console.log(data)
      } catch (error) {
        alert('Неверное название города')
      }
    },
  },
  getters: {
    getWeather(state) {
      return state.weather;
    },
    getWeatherHistory(state) {
      return state.weatherHistory;
    },
  },
});

export default store;