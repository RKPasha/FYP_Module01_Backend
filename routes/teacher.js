const express = require('express')
const Router = express.Router()
const mySqlConnection = require('../connection')

Router.get('/viewAll', (req, res) => {
  mySqlConnection.query(
    'Select * from teacher join person on teacherId = Id',
    (err, rows, fields) => {
      if (!err) {
        res.send(rows)
      } else {
        console.log('Query execution failed!\n' + err.message.toString())
      }
    }
  )
})

Router.get('/getGenderId', (req, res) => {
  mySqlConnection.query(
    "Select id from lookup where category = 'GENDER' and value = (?)",
    [req.body.gender],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows[0])
      } else {
        console.log('Query execution failed!\n' + err.message.toString())
      }
    }
  )
})

Router.get('/getDesignationId', (req, res) => {
  mySqlConnection.query(
    "Select id from lookup where category = 'DESIGNATION' and value = (?)",
    [req.body.designation],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows[0])
      } else {
        console.log('Query execution failed!\n' + err.message.toString())
      }
    }
  )
})


Router.post('/addTeacher', (req, res) => {
  console.log(req.body)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const dob = new Date(req.body.dob)
  const email = req.body.email
  const cnic = req.body.cnic
  const contact = req.body.contact

  mySqlConnection.query(
    "Set @gender = (Select id from lookup where category = 'GENDER' and value = '"+req.body.gender+"' ); Set @designation = (Select id from lookup where category = 'DESIGNATION' and value = '"+req.body.designation+"' ); BEGIN; INSERT INTO person (firstName, lastName, dob, email, cnic, contact, gender) VALUES (?,?,?,?,?,?,@gender); INSERT INTO teacher (teacherId, designation) VALUES(LAST_INSERT_ID(),@designation); COMMIT;",
    [firstName, lastName, dob, email, cnic, contact],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    }
  )
})

module.exports = Router