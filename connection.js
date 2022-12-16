const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sqluser',
  password: 'password',
  database: 'se_lab_fyp',
  multipleStatements: true
})

connection.connect(err => {
  if (!err) {
    console.log('Connected')
  } else {
    console.log('Connection Failed!\n' + err.message.toString())
  }
})

module.exports = connection;