const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(morgan('short'))

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

const movies = require('./routes/movie.js')
const users = require('./routes/user.js')
const logs = require('./routes/log.js')
const recommendations = require('./routes/recommendation.js')
const trends = require('./routes/trends.js')

app.use(movies)
app.use(users)
app.use(logs)
app.use(recommendations)
// app.use(trends)

// const dbRoute = 'mongodb://heroku_nmhhktbj:h62h6n86lhb84iokc6qapdknik@ds351628.mlab.com:51628/heroku_nmhhktbj';
// mongoose.connect(dbRoute, err => {
//     console.log(err)
// });
// let db = mongoose.connection

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database.db('heroku_nmhhktbj');
  console.log("Database connection ready");

    const PORT = process.env.PORT || 3003
    app.listen(PORT, () => {
        console.log("Server is up and listening on: " + PORT)
    })
})

app.get('/trend_get', (req, res) => {
    // console.log("TREND DB", db)

    var mapFunc = function () {
        for (var idx1 = 0; idx1 < this.tags.length; idx1++) {
            for (var idx2 = idx1 + 1; idx2 < this.tags.length; idx2++) {
                emit(this.tags[idx1], this.tags[idx2]);
                emit(this.tags[idx2], this.tags[idx1]);
            }
        }
    };

    var reduceFunc = function (keyKeywordId, tags) {
        if (tags.length === 0)
            return -1;
        var modeMap = {};
        var maxEl = tags[0], maxCount = 1;
        for (var i = 0; i < tags.length; i++) {
            var el = tags[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el] += 1;
            if (modeMap[el] === maxCount) {
                if (el < maxEl) {
                    maxEl = el;
                }
            }
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    };

    var mapReduceRes = db.collection("keywords").mapReduce(
        mapFunc,
        reduceFunc,
        { out: "times" }
    );
    
    var updateRes = db.collection("times").updateMany({}, { $rename: { "value": "keywordPair" } }, false, true)
    db.collection("times").find().toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get trends.");
        } else {
          res.json(docs);
        }
      });;
})

module.exports = db;
