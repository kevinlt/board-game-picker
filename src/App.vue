<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Game Board Picker</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/mygames">My games</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      title: 'Board Game Picker',
      gamesData: [],
      userGames: []
    }
  },
  created: function () {
    var vm = this
    var req = new XMLHttpRequest()
    req.open('GET', 'https://bgg-json.azurewebsites.net/collection/edwalter')
    req.onload = function () {
      var data = JSON.parse(this.response)
      data.forEach(element => {
        vm.gamesData.push(element)
      })
    }
    req.send()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
