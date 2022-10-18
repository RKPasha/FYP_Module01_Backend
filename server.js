const express = require('express')
const bodyParser = require('body-parser')
const TeacherRoutes = require('./routes/teacher')
const StudentRoutes = require('./routes/student')

const app = express()
app.use(bodyParser.json())

app.use('/teacher', TeacherRoutes)
app.use('/student', StudentRoutes)

app.listen(3000)
