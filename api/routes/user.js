const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.route('/signup')
.post(controller.createUser)
//.get(controller.getUsers);

router.route('/signin')
.post(controller.logUserIn);

router.route('/user/:id')
.delete(controller.deleteUser);;

module.exports = router;