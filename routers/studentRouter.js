const express = require('express')
const { auth } = require('../helpers/auth')
const { studentController } = require('../controllers')

const router = express.Router()

router.get('/getall', studentController.getAllStudent)
router.post('/register', studentController.register)

module.exports = router