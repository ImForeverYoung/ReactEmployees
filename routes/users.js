const express = require('express');
const router = express.Router();
const {auth}=require('../middleware/auth')

const { login,register,current } = require('../controllers/users.controller')
/* GET users listing. */
router.post('/login',login);
router.post('/register', register);
router.get('/current', auth, current);
module.exports = router;
