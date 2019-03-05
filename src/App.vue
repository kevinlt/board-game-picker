<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      title: 'Board Game Picker',
      gamesData: []
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
