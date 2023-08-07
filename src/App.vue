<template>
    <div>
        <div>
            <button @click="getCurrentLocationWeather" class="btn btn-home"
            v-if="!flag"
            >
                Weather at my home
            </button>
        </div>
        <button @click="openSettings" class="btn">
        <span :class="{'material-symbols-outlined': true, 'close-icon': flag}">{{ flag ? 'close' : 'settings' }}</span>
        </button>
        <settings-view v-if="flag" />
        <div v-else>
            <h1>Weather App</h1>
            <div class="child-container">
                    <child-card
                        v-for="(weatherData, index) in getWeatherHistory"
                        :key="index"
                        :weather="weatherData"
                    >
                    </child-card>
            </div>
        </div>
    </div>
</template>

<script>
import SettingsView from './views/SettingsView.vue'
import ChildCard from './components/ChildCard.vue';

import { mapGetters } from 'vuex';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getWeatherHistory'])
    },
    data() {
        return {
            flag: false
        }
    },
    methods: {
        openSettings() {
            this.flag = !this.flag
        },
    },
    components: {
        SettingsView,
        ChildCard,
    },
  setup() {
    const store = useStore();
    const currentLocationWeather = ref(null);

    const fetchWeatherByCoords = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `${store.state.url_base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${store.state.api_key}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
      }
    };

    const getCurrentLocationWeather = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords;
            const weatherData = await fetchWeatherByCoords(latitude, longitude);
            if (weatherData) {
              store.commit('SET_WEATHER', weatherData);
              currentLocationWeather.value = weatherData;
            }
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    return {
      currentLocationWeather,
      getCurrentLocationWeather
    };
  }
}
</script>

<style scoped>
    h1 {
        text-align: center;
    }
    .child-container {
        padding: 0 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .btn-home {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 30%;
        font-size: 1.5em;

    }
</style>