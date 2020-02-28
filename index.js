const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const app = express()
const PORT = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())
app.use(express.static('public'))
app.use(bearerToken())


app.get('/', (req,res) =>{
    res.status(202).send('<h1> Welcome to ALevel.id API ! </h1>')
})

const {
    studentRouter
} = require('./routers')

app.use('/student', studentRouter)

app.listen(PORT, () => console.log(`API berhasil aktif di PORT ${PORT}`))