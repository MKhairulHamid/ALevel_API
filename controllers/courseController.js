const fs = require('fs')
const { sqlDB } = require('../databases')

module.exports = {
    getAllCourse : (req,res) => {
        var sql = `SELECT * FROM courses;`

        sqlDB.query(sql, (err, results) => {
            if(err){
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getAllCourseById : (req,res) => {
        const { id } = req.params;
        var sql = `SELECT * FROM courses WHERE id=${id};`;
        console.log(req.params)
        sqlDB.query(sql, (err, results) => {
            if(err){
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    addCourse : (req,res) => {

        var sql = `INSERT INTO courses SET? `

        sqlDB.query(sql, req.body, (err,results) => {
            if(err) return res.status(500).send({message: 'Database Error', err, error: true})

            res.status(200).send({ results: results})
        })
    },
    editCourse : (req,res) => {

        var sql = `UPDATE courses SET? WHERE id=${req.body.id}`

        sqlDB.query(sql, req.body, (err, results) => {
            if(err) return res.status(500).send({message:  'Database Error', err, error: true})

            res.status(200).send({ results: results})
        })

    },
    deleteCourse : (req,res) => {
        var sql =  `DELETE FROM courses WHERE id=${req.params.id}`

        sqlDB.query(sql, (err,results) => {
            if(err) return res.status(500).send({message:  'Database Error', err, error: true})

            res.status(200).send({ results: results})
        })
    }
}