const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()

const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null
const initializingDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server is running on http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error : ${e.message}`)
    process.exit(1)
  }
}

initializingDBAndServer()
console.log(db)

app.get('/', (req, res) => {
  res.send('Hai')
})

app.get('/players/', async (request, response) => {
  const getBooksQuery = `
  SELECT
  *
  FROM
  cricket_team
  ORDER BY
  player_id;`
  const listOfPlayers = await db.all(getBooksQuery)
  console.log(listOfPlayers)
  response.send(listOfPlayers)
})

module.exports = app
