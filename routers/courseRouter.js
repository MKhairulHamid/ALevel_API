const express = require('express')
const { auth } = require('../helpers/auth')
const { courseController } = require('../controllers')


const router = express.Router()

router.get('/getall', courseController.getAllCourse)
router.get('/getbyid/:id', courseController.getAllCourseById)
router.post('/addcourse', auth,  courseController.addCourse)
router.patch('/editcourse', auth, courseController.editCourse)
router.delete('/deletecourse/:id',  courseController.deleteCourse)


module.exports = router
