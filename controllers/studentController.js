const { sqlDB } = require('../databases')

module.exports = {
    getAllStudent: (req,res) => {
        const query = `SELECT *
            FROM students;`
        sqlDB.query(query,(err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    register: (req,res) => {
        let query = `SELECT email
                FROM students 
                WHERE email = ${sqlDB.escape(req.body.email)};` ;
        sqlDB.query(query,(err,results) => {
            if(err) {
                return res.status(500).send({message:'Database Error!', err, error: true})
            }

            if(results.length > 0){
                return res.status(500).send({ message : 'Your email already registered'})
            } 
            
            sql = `INSERT INTO students SET ? `;
            
            sqlDB.query(sql, req.body, (err,results) => {
                if(err) {
                    return res.status(500).send({message:'Database Error Bro!', err, error: true})
                }
                res.status(200).send({ result: results, email: req.body.email })
            })
        
        })

    }
}