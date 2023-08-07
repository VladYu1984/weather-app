<template>
    <div class="weather-wrap"
        :style="{ backgroundImage: `url('/src/assets/${weather.main.toLowerCase()}.jpg')` }"
    >
    <span
        class="material-symbols-outlined close-card"
        @click="removeCard"
    >close</span>
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.country}}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.temp) }}°C</div>
          <div class="weather">Weather:{{ weather.main}}</div>
          <div class="humidity">Humidity:{{ weather.humidity }} %</div>
          <div class="wind_speed">Wind speed:{{ weather.speed }} m/s</div>
          <div class="pressure">Pressure:{{ weather.pressure }} hPa</div>
          <div class="visibility">Visibility:{{ weather.visibility }} km</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    props: ['weather'],
    computed: {
        ...mapGetters(['getWeatherHistory'])
    },
    methods: {
        dateBuilder() {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();

            return `${day} ${date} ${month} ${year}`;
        },
        ...mapMutations(['REMOVE_LOCATION']),
        removeCard() {
            const index = this.$store.state.weatherHistory.findIndex(item => item.name === this.weather.name);
            if (index !== -1) {
                this.REMOVE_LOCATION(index);
            }
        }
    }
}
</script>

<style scoped>
    .location-box .location {
        color: #fff;
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        text-shadow: 1px 3px rgba(0, 0, 0, .25);
    }

    .location-box .date {
        color: #fff;
        font-size: 20px;
        font-weight: 300;
        font-style: italic;
        text-align: center;
    }
    .weather-wrap {
        height: 50vh;
        width: 50vh;
        margin-bottom: 15px;
        background-size: cover;
        background-position: center;
        position: relative;
        top: 100px;
        border-radius: 16px;
        text-shadow: 3px 6px rgba(0, 0, 0, .25);
        box-shadow: 6px 9px rgba(171, 171, 171, 0.5);;
    }
    .weather-box {
        text-align: center;
    }

    .weather-box .temp {
        display: inline-block;
        padding: 10px 25px;
        color: #fff;
        font-size: 102px;
        font-weight: 900;

        text-shadow: 3px 6px rgba(0, 0, 0, .25);
        background-color: rgba(255,255,255,.25);
        border-radius: 16px;
        margin: 30px 0px;

        box-shadow: 3px 6px rgba(0, 0, 0, .25);
    }

    .weather-box, .weather .humidity .wind_speed .pressure .visibility{
        color: rgb(0, 0, 0);
        font-weight: 700;
        font-style: italic;
        text-shadow: 3px 6px rgba(0, 0, 0, .25);
        margin-bottom: 5px;
    }

    .close-card {
        margin: 10px;
        border-radius: 16px;
        color: #fff;
        border: 1px solid #fff;
        cursor: pointer;
    }
</style>