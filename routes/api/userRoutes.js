const router = require('express').Router();

//importing fn from controllers
const { getAllUsers, getByID, } = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers);

// api/users/:userID
router.route('/:userID').get(getByID);

module.exports = router;