const express = require('express')
const { body, validationResult } = require('express-validator')
const Router = express.Router()
const mySqlConnection = require('../connection')

//Get all teachers from DB
Router.get('/viewAll', (req, res) => {
  mySqlConnection.query(
    'SELECT * FROM teacher JOIN person ON teacherId = Id WHERE isDeleted <> 1',
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

const getAge = dateString => {
  var ageInMilliseconds = new Date() - new Date(dateString)
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365) // convert to years
}

//Add teacher to DB
Router.post(
  '/addTeacher',
  [
    body(
      'firstName',
      'First name is not valid! (Must be 3 to 15 characters long)'
    )
      .isAlpha()
      .isLength({ min: 3, max: 15 })
      .trim(),
    body(
      'lastName',
      'Last name is not valid! (Must be 3 to 15 characters long)'
    )
      .isAlpha()
      .isLength({ min: 3, max: 15 })
      .trim(),
    body('email', 'Email is not valid! (Format: abc@xyz.uet.edu.pk)')
      .isEmail()
      .normalizeEmail(),
    body('dob').custom(dob => {
      if (getAge(dob.toString()) < 16 || getAge(dob.toString()) > 80) {
        throw new Error(
          'Date of Birth is not valid! (Age must be 16 to 80 years.)'
        )
      }
      return true
    }),
    body('cnic', 'CNIC is not valid! (Hint: Write without dashes.)')
      .isNumeric()
      .trim()
      .isLength({ min: 13, max: 13 }),
    body('contact', 'Contact No. is not valid! (Format: 03xxxxxxxxx)')
      .isNumeric()
      .trim()
      .isLength({ min: 11, max: 11 })
  ],
  (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const dob = new Date(req.body.dob)
    const email = req.body.email
    const cnic = req.body.cnic
    const contact = req.body.contact

    mySqlConnection.query(
      "Set @gender = (Select id from lookup where category = 'GENDER' and value = '" +
        req.body.gender +
        "' ); Set @designation = (Select id from lookup where category = 'DESIGNATION' and value = '" +
        req.body.designation +
        "' ); BEGIN; INSERT INTO person (firstName, lastName, dob, email, cnic, contact, gender) VALUES (?,?,?,?,?,?,@gender); INSERT INTO teacher (teacherId, designation) VALUES(LAST_INSERT_ID(),@designation); COMMIT;",
      [firstName, lastName, dob, email, cnic, contact],
      (err, result) => {
        if (err) {
          res.send(err)
        } else {
          res.send('Values Inserted')
        }
      }
    )
  }
)

//Edit teacher from DB
Router.put(
  '/editTeacher',
  [
    body(
      'firstName',
      'First name is not valid! (Must be 3 to 15 characters long)'
    )
      .isAlpha()
      .isLength({ min: 3, max: 15 })
      .trim(),
    body(
      'lastName',
      'Last name is not valid! (Must be 3 to 15 characters long)'
    )
      .isAlpha()
      .isLength({ min: 3, max: 15 })
      .trim(),
    body('email', 'Email is not valid! (Format: abc@xyz.uet.edu.pk)')
      .isEmail()
      .normalizeEmail(),
    body('dob').custom(dob => {
      if (getAge(dob.toString()) < 16 || getAge(dob.toString()) > 80) {
        throw new Error(
          'Date of Birth is not valid! (Age must be 16 to 80 years.)'
        )
      }
      return true
    }),
    body('cnic', 'CNIC is not valid! (Hint: Write without dashes.)')
      .isNumeric()
      .trim()
      .isLength({ min: 13, max: 13 }),
    body('contact', 'Contact No. is not valid! (Format: 03xxxxxxxxx)')
      .isNumeric()
      .trim()
      .isLength({ min: 11, max: 11 })
  ],
  (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const dob = new Date(req.body.dob)
    const email = req.body.email
    const cnic = req.body.cnic
    const contact = req.body.contact

    mySqlConnection.query(
      "Set @gender = (Select id from lookup where category = 'GENDER' and value = '" +
        req.body.gender +
        "' ); Set @designation = (Select id from lookup where category = 'DESIGNATION' and value = '" +
        req.body.designation +
        "' ); BEGIN; UPDATE person SET firstName = ?, lastName = ?, dob = ?, email = ?, cnic = ?, contact = ?, gender = @gender WHERE id = ?; UPDATE teacher SET designation = @designation WHERE teacherId = ?; COMMIT;",
      [firstName, lastName, dob, email, cnic, contact, id, id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send('Values Updated')
        }
      }
    )
  }
)


//Delete (Set isDeleted to 1) teacher from DB
Router.put('/deleteTeacher', (req, res) => {
  console.log(req.body)
  const id = req.body.id

  mySqlConnection.query(
    'BEGIN; UPDATE teacher SET isDeleted = 1 WHERE teacherId = ?; COMMIT;',
    [id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Record Deleted(dhoka)')
      }
    }
  )
})

module.exports = Router
