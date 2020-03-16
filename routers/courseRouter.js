const express = require('express')
const { auth } = require('../helpers/auth')
const { courseController } = require('../controllers')

const router = express.Router()

router.get('/getall', courseController.getAllCourse)
router.get('/getbyid/:id', courseController.getAllCourseById)


module.exports = router
