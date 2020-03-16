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
    }
}