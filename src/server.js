var express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

var app = express()
app.use(cors())
app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

let Game = database.define('game', {
  name: Sequelize.TEXT,
  image: Sequelize.STRING,
  thumbnail: Sequelize.STRING,
  maxPlayers: Sequelize.INTEGER,
  minPlayers: Sequelize.INTEGER,
  isExpension: Sequelize.BOOLEAN,
  description: Sequelize.TEXT,
  type: Sequelize.TEXT,
  rating: Sequelize.FLOAT
})

// Initialize epilogue
epilogue.initialize({
    app: app,
    sequelize: database
})

// Create the dynamic REST resource for our Post model
let userResource = epilogue.resource({
    model: Game,
    endpoints: ['/games', '/games/:id']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
      app.listen(8081, () => {
        console.log('listening to port localhost:8081')
      })
  })