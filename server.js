const express = require('express')
const bodyParser = require('body-parser')
const TeacherRoutes = require('./routes/teacher')

const app = express()
app.use(bodyParser.json())

app.use('/teacher', TeacherRoutes)

app.listen(3000)
