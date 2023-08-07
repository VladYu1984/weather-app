<template>
    <div class="settings">
        <div class="search-box">
          <h1>Settings</h1>
          <span>Add location:</span>
          <div class="search">
          <input 
              type="text"
              class="search-bar"
              placeholder="поиск..."
              v-model="query"
              @keypress="fetchWeatherByKeyPress"
          />
            <span 
              class="material-symbols-outlined" 
              @click="fetchWeatherByButtonPress"
            >keyboard_return</span>
          </div>
          <div class="countries">
            <ul>
              <li 
                v-for="(location, index) in getWeatherHistory" 
                :key="index"
                :draggable="true"
                @dragstart="handleDragStart($event, index)"
                @dragover="handleDragOver($event, index)"
                @drop="handleDrop($event, index)"
                @dragend="handleDragEnd"
                class="draggable-item"
              >
                <span
                  class="material-symbols-outlined" 
                >menu</span>
                {{ location.name }}, {{ location.country }}
                <span
                  class="material-symbols-outlined"
                  @click="removeLocation(index)"
                >delete</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      query: '',
      draggedIndex: null,
    };
  },
  computed: {
    ...mapGetters(['getWeatherHistory']),
  },
  methods: {
    ...mapActions(['fetchWeather', 'updateSelectedLocation']),
    
    async fetchWeatherByKeyPress(e) {
      if (e.key === 'Enter' && this.query) {
        this.$store.commit('SET_QUERY', this.query);
        await this.fetchWeather();
        this.query = ''
      }
    },
    async searchLocation() {
      const locationData = await fetchWeatherData();
      this.updateSelectedLocation(locationData);
    },
    deleteLocation(index) {
      this.weatherList.splice(index, 1);
      this.saveWeatherHistory();
    },
    
    fetchWeatherByButtonPress(index) {
      if (this.query) {
        this.$store.commit('SET_QUERY', this.query);
        this.$store.dispatch('fetchWeather');
        this.query = ''
      }
    },

    removeLocation(index) {
      this.$store.commit('REMOVE_LOCATION', index);
    },

    handleDragStart(event, index) {
      this.draggedIndex = index;
    },

    handleDragOver(event, index) {
      event.preventDefault();
    },

    handleDrop(event, targetIndex) {
      this.$store.commit('REORDER_LOCATIONS', {
        oldIndex: this.draggedIndex,
        newIndex: targetIndex,
      });

      this.draggedIndex = null;
    },

    handleDragEnd() {
      this.draggedIndex = null;
    },
  },
};
</script>

<style scoped>
  h1 {
    color: rgb(30, 42, 101);
  }
  .settings {
    display: flex;
    justify-content: space-between;
    background-color: aquamarine;
    height: 100vh;
    background-color: rgba(253, 255, 127, 0.767);
    text-align: center;
    padding: 0 25px;
  }
  .search-box {
      width: 100%;
      margin-bottom: 30px;
      position: relative;
      top: 100px;
      display: flex;
      flex-direction: column;
  }

    .search-bar {
      display: block;
      width: 100%;
      height: 7.5vh;
      padding: 15px;

      color: #313131;
      font-size: 20px;

      appearance: none;
      border: none;
      outline: none;
      background: none;

      background-color: rgba(255,255,255,.5);
      border-radius: 16px;
      transition: 0.4s;
    }
    .search-box .search-bar :focus {
      border-radius: 16px 0 16px 0;
      border: 1px solid #509cf4;
    }
    .search {
      display: flex;
    }
    .search > span {
      font-size: 24px;
      cursor: pointer;
    }
    span {
      color: rgb(30, 42, 101);
      text-align: left;
      margin: 15px;
      font-size: 1.25em;
    }
    ul {
      list-style-type: none;
      margin-top: 30px;
    }
    ul > li {
      margin: 15px 5px;
      font-size: 1.5em;
      border: 1px solid #000;
      background-color: rgb(255, 228, 196, 0.5);
      border-radius: 16px;
      width: 100%;
      align-items: center;

      display: flex;
      justify-content: space-between;
    }
    .countries {
      padding-right: 50px;
    }
    li > span {
      font-size: 1em;
      cursor: pointer;
    }
    .draggable-item:active {
      cursor: pointer;
      border-radius: 16px;
    }
</style>