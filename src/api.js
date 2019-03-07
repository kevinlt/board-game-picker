import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8081/',
    json: true
})

export default {
    async execute(method, resource, data) {
        // inject the accessToken for each request

        return client({
            method,
            url: resource,
            data,
        }).then(req => {
            return req.data
        })
    },
    getGames() {
        return this.execute('get', '/games')
    },
    getGame(id) {
        return this.execute('get', `/games/${id}`)
    },
    createGame(data) {
        return this.execute('post', '/games', data)
    },
    updateGame(id, data) {
        return this.execute('put', `/games/${id}`, data)
    },
    deleteGame(id) {
        return this.execute('delete', `/games/${id}`)
    }
}