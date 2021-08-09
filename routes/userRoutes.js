const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signup);

router.route('/').get(userController.getAllUsers);
router.route('/:id').delete(userController.deleteUser);

module.exports = router;
