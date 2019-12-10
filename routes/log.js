// contains all movie related routes
const express = require("express")
const mysql = require("mysql")
const router = express.Router()

router.get('/log_get', (req, res) => {
    const connection = getConnection()

    const queryString = "SELECT * FROM log"
    connection.query(queryString, (err, results, fields) => {
        if (err) {
            console.log("Failed to get log: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Got log: ", results.insertId)
        res.json(results)
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-mm-dca-648e9a121678.g5.cleardb.net',
    user: 'b04a078ee0777f',
    password: '22fcc01e',
    database: 'heroku_de2493ad86ba222'
})

function getConnection() {
    return pool
}

module.exports = router