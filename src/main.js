import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index.js'

const app = createApp(App).use(store);


// Обработчик перед выгрузкой страницы
window.addEventListener('beforeunload', () => {
    localStorage.setItem('weatherHistory', JSON.stringify(store.state.weatherHistory));
  });
  
  // Восстановление данных из localStorage при загрузке страницы
  const savedWeatherHistory = localStorage.getItem('weatherHistory');
  if (savedWeatherHistory) {
    store.commit('SET_WEATHER_HISTORY', JSON.parse(savedWeatherHistory));
  }

app.mount('#app');