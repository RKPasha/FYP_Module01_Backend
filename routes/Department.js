const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');
const cors = require('cors')
const { body, validationResult } = require('express-validator');
const e = require('express');
const mySqlConnection = require('../connection')
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.post('/AddDepartment', 
    body('departmentname'),
    body('degreeName'),
    body('degreeType'),
    (req, res) => {        
        const departmentname= req.body.departmentname;
        const degreeName=req.body.degreeName;
        const degreeType=req.body.degreeType;
        const errors = validationResult(req);
        if (!errors.isEmpty()&&validate_Department_and_Degree(degreeName,degreeName,degreeType)) {
            saveDepartment(departmentname)
            saveDegree(degreeName,degreeType)
        }
})
app.post('/UpdateDepartment', 
    body('departmentname'),
    body('degreeName'),
    body('degreeType'),
    (req, res) => {        
        const departmentname= req.body.departmentname;
        const degreeName=req.body.degreeName;
        const degreeType=req.body.degreeType;
        const errors = validationResult(req);
        if (!errors.isEmpty()&&validate_Department_and_Degree(degreeName,degreeName,degreeType)) {
            editDepartment(departmentname,degreeName,degreeType)
            editDegree(degreeName,degreeType)
        }
})
app.post('/DeleteDepartment', 
    body('departmentname'),
    body('degreeName'),
    body('degreeType'),
    (req, res) => {        
        const departmentname= req.body.departmentname;
        const degreeName=req.body.degreeName;
        const degreeType=req.body.degreeType;
        const errors = validationResult(req);
        if (!errors.isEmpty()&&validate_Department_and_Degree(degreeName,degreeName,degreeType)) {
            DeleteDepartment(departmentname,degreeName,degreeType)
            DeleteDegree(degreeName,degreeType)
        }
})

function validate_Department_and_Degree(degreeName,degreeName,degreeType){
    const regex = /^Department of+ [a-zA-Z]+ [a-zA-Z]+$/;    
    const regex1 = /^[a-zA-Z]+ [a-zA-Z]$/;
    const degree_Type=["Bs.","Bsc","Msc","Masters","Phd.","M.phill"]
    if(regex.test(degreeName)&&regex.test(degreeName)&&degree_Type.includes(degreeType)){
        return true;
    }else{
        return false;
    }

}

function saveDepartment(departmentname){
    mySqlConnection.query("",
        [departmentname],
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send('Values Inserted')
            console.log(result)
          }
        }
      )
}
function editDepartment(departmentname){
    mySqlConnection.query("",
        [departmentname],
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send('Values Inserted')
            console.log(result)
          }
        }
      )
}
function deleteDepartment(departmentname){
    mySqlConnection.query("",
        [departmentname],
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send('Values Inserted')
            console.log(result)
          }
        }
      )
}
function saveDegree(degreeName,degreeType){
    mySqlConnection.query("",
        [degreeName, degreeType],
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send('Values Inserted')
            console.log(result)
          }
        }
      )
}
function editDegree(degreeName,degreeType){
    mySqlConnection.query("",
        [degreeName, degreeType],
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send('Values Inserted')
            console.log(result)
          }
        }
      )
}
function deleteDegree(degreeName,degreeType){
    mySqlConnection.query("",
        [degreeName, degreeType],
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send('Values Inserted')
            console.log(result)
          }
        }
      )
}