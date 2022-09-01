const express = require('express')
const router = express.Router()
const { postSignup, postLogin } = require('../controllers/userController');

router
    .route('/')
    .post(postSignup);

router  
    .route('/user')
    .post(postLogin)    


module.exports = router;
