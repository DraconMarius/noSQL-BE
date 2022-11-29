const router = require('express').Router();

//importing fn from controllers
const { getAllUsers, getByID, newUser, updateByID, addFriend, removeFriend, deleteUser } = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers).post(newUser).delete(deleteUser);

// api/users/:userID
router.route('/:userID').get(getByID).put(updateByID);

// api/users/:userID/friend/:friendID
router.route('/:userID/friend/:friendID').put(addFriend).delete(removeFriend)


module.exports = router;