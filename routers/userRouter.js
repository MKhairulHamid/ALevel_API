const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();
const { auth } = require('../helpers/auth')

router.get('/getall', userController.getUsers)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/keeplogin', auth , userController.keepLogin)


module.exports = router;