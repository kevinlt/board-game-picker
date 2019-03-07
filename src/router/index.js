import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import UserGames from '@/components/UserGames'
import GameDetail from '@/components/GameDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/mygames',
      name: 'UserGames',
      component: UserGames
    },
    {
      path: '/game',
      name: 'GameDetail',
      component: GameDetail
    }
  ]
})
