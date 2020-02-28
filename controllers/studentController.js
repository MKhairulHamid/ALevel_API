const crypto = require('crypto')
const fs = require('fs')
const { sqlDB } = require('../databases')
const { createJWTToken } = require('../helpers/jwt')

const secret = 'jamdinding';

module.exports = {
    getAllStudent: (req,res) => {
        const query = `SELECT *
            FROM student;`
        sqlDB.query(query,(err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    register: (req,res) => {
        // FROM UI =>
        // studentFirstName
        // studentLastName
        // studentEmail
        // studentPhone

        // req.body.studentRegistrationDate = new Date ()
        
        // req.body.studentPassword = crypto.createHmac('sha256', secret)
        //                     .update(req.body.studentPassword)
        //                     .digest('hex');
        
        // req.body.studentSchoolID = 0
        // req.body.studentGrade = 10
        // req.body.studentParentID = 0
        // req.body.studentCity = ''
        // req.body.studentKecamatan = ''
        // req.body.studentAddress = ''
        // req.body.studentProfileImage = '/.default/default.jpg'
        // req.body.studentEmailVerified = 0


        var sql = `SELECT studentID FROM student WHERE studentEmail = ${sqlDB.escape(req.body.studentEmail)};` ;
        
        sqlDB.query(sql,(err,results) => {
            if(err) {
                return res.status(500).send({message:'Database Error - 1', err, error: true})
            }

            if(results.length > 0){
                return res.status(500).send({ message : 'Your email already registered', error: true})
            } 
            
            sql = `INSERT INTO student SET ? `;
            
            sqlDB.query(sql, req.body, (err,results) => {
                if(err) {
                    return res.status(500).send({message:'Database Error - 2', err, error: true})
                }
                res.status(200).send({ result: results, email: req.body.email })
            })
            
        })

    }
}