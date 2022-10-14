const express = require('express')
const Router = express.Router();

const mySqlConnection = require('../connection');

Router.get('/', (req, res) => {
    mySqlConnection.query('Select * from teacher join person on teacherId = Id', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
            console.log(fields)
          } else {
            console.log('Query execution failed!\n' + err.message.toString())
          }
    })
})

module.exports = Router;