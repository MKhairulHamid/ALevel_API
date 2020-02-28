const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) =>{
    res.status(202).send('<h1> Welcome to ALevel.id API ! </h1>')
})

const {
    studentRouter
} = require('./routers')

app.use('/student', studentRouter)

app.listen(PORT, () => console.log(`API berhasil aktif di PORT ${PORT}`))