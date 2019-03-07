<template>
  <div class="search">
    <h2>Chercher un jeu</h2>
            <label for="nbPlayers">Nombre de joueurs :</label>
            <select name="nbPlayers" v-model="nbPlayers" @change="filterPlayer()">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10 et plus</option>
            </select>
            <div v-if="nbPlayers > 0">
                <label for="playingTime">Temps de jeu :</label>
                <select name="playingTime" v-model="playingTime" @change="filterTime()">
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                </select>
            </div>
            <button @click="reset" type="button">Reset</button>
            <input v-model="search" v-on:keyup.prevent="searchGame" placeholder="Chercher un jeu"/>
            <b-row>
              <b-col>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Min players</th>
                      <th>Max players</th>
                      <th>Playing time</th>
                      <th>Rating</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="game in searchList" :key="game.gameId">
                      <td><img :src="game.thumbnail"/></td>
                      <td>{{ game.name }}</td>
                      <td>{{ game.minPlayers }}</td>
                      <td>{{ game.maxPlayers }}</td>
                      <td>{{ game.playingTime }}</td>
                      <td>{{ game.averageRating }}</td>
                      <td class="text-right">
                        <a href="#" @click.prevent="addGameToList(game.gameId)">Add to my games</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
            
  </div>
</template>

<script>
import Game from './Game'
import api from '@/api'

export default {
  name: 'Search',
  data () {
    return {
      searchList: [],
      nbPlayers: 0,
      playingTime: 0,
      search: '',
      model: {}
    }
  },
  components: {
    Game
  },
  methods: {
    filterPlayer: function () {
      this.searchList = this.$parent.$data.gamesData.filter(game => (game.maxPlayers >= this.nbPlayers && game.minPlayers <= this.nbPlayers))
    },
    filterTime: function () {
      this.filterPlayer()
      this.searchList = this.searchList.filter(game => game.playingTime == this.playingTime)
    },
    reset: function () {
      this.searchList = []
    },
    searchGame: function () {
      this.reset()
      this.searchList = this.$parent.$data.gamesData.filter(game => game.name.toUpperCase().includes(this.search.toUpperCase()))
    },
    async addGameToList (key) {
      let game = this.$parent.$data.gamesData.filter(game => game.gameId === key)[0]
      this.model = {
        name: game.name,
        image: game.image,
        thumbnail: game.thumbnail,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        isExpansion: game.isExpansion,
        description: '',
        type: '',
        rating: game.averageRating
      }
      await api.createGame(this.model)
      this.model = {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
