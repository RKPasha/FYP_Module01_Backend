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

app.post('/CreateCommittee',
    body('committeeTitle'),
    body('committeeDescription'),
    (req, res) => {
        const committeeTitle = req.body.committeeTitle;
        const committeeDescription = req.body.committeeDescription;
        const errors = validationResult(req);
        if (!errors.isEmpty() && validate_Committee(committeeTitle)) {
            saveCommittee(committeeTitle, committeeDescription)
        }
    })
app.post('/UpdateCommittee',
    body('committeeTitle'),
    body('committeeDescription'),
    (req, res) => {
        const departmentname = req.body.committeeTitle;
        const degreeName = req.body.committeeDescription;
        const errors = validationResult(req);
        if (!errors.isEmpty() && validate_Committee(committeeTitle)) {
            editCommittee(departmentname)

        }
    })

app.post('/DeleteCommittee',
    body('committeeTitle'),
    body('committeeDescription'),
    (req, res) => {
        const departmentname = req.body.departmentname;
        const degreeName = req.body.degreeName;
        const degreeType = req.body.degreeType;
        const errors = validationResult(req);
        if (!errors.isEmpty() && !validate_Department_and_Degree(degreeName, degreeName, degreeType)) {
            DeleteDepartment(departmentname, degreeName, degreeType)
            DeleteDegree(degreeName, degreeType)
        }
    })

app.post('/AddCommitteeMember',
    body('committeeTitle'),
    body('committeeDescription'),
    (req, res) => {
        const committeeTitle = req.body.committeeTitle;
        const committeeDescription = req.body.committeeDescription;
        const errors = validationResult(req);
        if (!errors.isEmpty() && validate_Committee(committeeTitle)) {
            saveCommittee(committeeTitle, committeeDescription)
        }
    })

app.post('/UpdateCommitteeMember',
    body('committeeTitle'),
    body('committeeDescription'),
    (req, res) => {
        const departmentname = req.body.committeeTitle;
        const degreeName = req.body.committeeDescription;
        const errors = validationResult(req);
        if (!errors.isEmpty() && validate_Committee(committeeTitle)) {
            editCommittee(departmentname)

        }
    })

app.post('/DeleteCommitteeMember',
    body('committeeTitle'),
    body('committeeDescription'),
    (req, res) => {
        const departmentname = req.body.departmentname;
        const degreeName = req.body.degreeName;
        const degreeType = req.body.degreeType;
        const errors = validationResult(req);
        if (!errors.isEmpty() && !validate_Department_and_Degree(degreeName, degreeName, degreeType)) {
            DeleteDepartment(departmentname, degreeName, degreeType)
            DeleteDegree(degreeName, degreeType)
        }
    })
function validate_Committee(committeeTitle) {
    //const regex = /^Department of+ [a-zA-Z]+ [a-zA-Z]+$/;    
    const regex1 = /^[a-zA-Z]+ [a-zA-Z]$/;
    //const degree_Type=["Bs.","Bsc","Msc","Masters","Phd.","M.phill"]
    if (regex1.test(committeeTitle)) {
        return true;
    } else {
        return false;
    }

}

function saveCommittee(committeeTitle, committeeDescription) {
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

function editCommittee(committeeTitle, committeeDescription) {
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

// function delete_Committee_Member(departmentname) {
//     mySqlConnection.query("",
//         [departmentname],
//         (err, result) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.send('Values Inserted')
//                 console.log(result)
//             }
//         }
//     )
// }
function save_Committee_Member() {
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
function edit_Committee_member(degreeName, degreeType) {
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
// function deleteDegree(degreeName, degreeType) {
//     mySqlConnection.query("",
//         [degreeName, degreeType],
//         (err, result) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.send('Values Inserted')
//                 console.log(result)
//             }
//         }
//     )
// }