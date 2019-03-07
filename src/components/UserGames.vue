<template>
  <div id="user-games">
    <Game v-for="game in games" :key="game.id" :game="game" :class="game">
      <img :src="game.thumbnail" />
      <button type="button" @click.prevent="deleteGame(game.id)">X</button>
    </Game>
  </div>
</template>

<script>
import Game from './Game'
import api from '@/api'

export default {
  name: 'UserGames',
  data () {
    return {
      games: [],
      model: {}
    }
  },
  async created () {
    this.refreshGames()
  },
  components: {
    Game
  },
  methods: {
    async refreshGames () {
      this.loading = true
      this.games = await api.getGames()
      this.loading = false
    },
    async populateGameToEdit (game) {
      this.model = Object.assign({}, game)
    },
    async saveGame () {
      console.log('test')
      if (this.model.id) {
        await api.updateGame(this.model.id, this.model)
      } else {
        await api.createGame(this.model)
      }
      this.model = {} // reset form
      await this.refreshGames()
    },
    async deleteGame (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteGame(id)
        await this.refreshGames()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
