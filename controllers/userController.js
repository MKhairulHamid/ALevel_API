const crypto = require('crypto')
const fs = require('fs')
const { sqlDB } = require('../databases')
const { createJWTToken } = require('../helpers/jwt')

const secret = 'jamdinding';

module.exports = {
    getUsers : (req,res) => {
        let sql = `SELECT * FROM users where email = '${req.query.email}';`
        sqlDB.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },



    register: (req,res) => {
        
        var {firstName, lastName , email, password } = req.body

        var role  = "user"

        let hashPassword = crypto.createHmac('sha256', secret).update(password).digest('hex');

        var sql = `SELECT id FROM users WHERE email = ${sqlDB.escape(req.body.email)};` ;
        
        sqlDB.query(sql,(err,results) => {
            if(err) {
                return res.status(500).send({message:'Database Error - 1', err, error: true})
            }

            if(results.length > 0){
                return res.status(500).send({ message : 'Your email already registered', error: true})
            } 
            
            sqlInsert = `INSERT INTO users (firstName, lastName, email,password,role,address, verified) VALUES ( '${firstName}','${lastName}','${email}', '${hashPassword}','${role}', null, 0 ) `;
            
            sqlDB.query(sqlInsert, req.body, (err,results) => {
                if(err) {
                    return res.status(500).send({message:'Database Error - 2', err, error: true})
                }
                const token = createJWTToken({
                    firstName,
                    lastName,
                    email
                })
                res.status(200).send({ 
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                    token
                })
            })
            
            
        })

    }, 

    login : (req, res) => {
        const { email, password } = req.body;

        let hashPassword = crypto.createHmac('sha256', secret ).update(password).digest('hex')

        let sql = `SELECT * from users where email = '${email}' and password = '${hashPassword}';`;

        sqlDB.query(sql, (err, results) => {
            if(err) res.status(500).send(err);

            if(results && results.length > 0){
                let{ id, firstName, lastName, password, email, address, role } = results[0]
                const token = createJWTToken({
                    firstName,
                    lastName,
                    email
                })
                console.log(token)
                return res.status(200).send({
                    id,
                    firstName,
                    lastName,
                    email,
                    address,
                    role,
                    token
                })
            } else {
                res.status(200).send('Email or Password Invalid')
            }
        })
    } ,

    keepLogin : (req,res) => {
        let sql = `SELECT * FROM users WHERE email = "${req.user.email}";`;
        sqlDB.query(sql, (err, results) => {
            if(err) res.status(500).send(err)

            const { id, firstName, lastName, email, address, verified,role } = results[0]

            const token = createJWTToken({
                firstName,
                lastName,
                email
            })
            return res.status(200).send({
                id,
                firstName,
                lastName,
                email,
                address,
                verified,
                role,
                token
            })
        })
    }
    // new controller
}