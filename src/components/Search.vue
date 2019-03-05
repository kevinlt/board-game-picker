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
            <input v-model="search" v-on:keyup="searchGame()" placeholder="Chercher un jeu"/>
            <Game
                v-for="game in searchList"
                :key="game.gameId"
                :game="game"
                :class="game"
            >
                <img :src="game.thumbnail"/>
                <button @click="addGameToList(game.gameId)" type="button">Ajouter à ma liste</button>
            </Game>
  </div>
</template>

<script>
import Game from './Game'

export default {
  name: 'Search',
  data () {
    return {
      searchList: [],
      userGames: [],
      nbPlayers: 0,
      playingTime: 0,
      search: ''
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
      this.searchList = this.searchList.filter(game => game.playingTime === this.playingTime)
    },
    reset: function () {
      this.searchList = []
    },
    searchGame: function () {
      this.reset()
      this.searchList = this.$parent.$data.gamesData.filter(game => game.name.toUpperCase().includes(this.search.toUpperCase()))
    },
    addGameToList: function (key) {
      this.userGames.push(this.$parent.$data.gamesData.filter(game => game.gameId === key))
    },
    setCurrentPage: function (page) {
      this.currentPage = page
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
