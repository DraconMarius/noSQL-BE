const router = require('express').Router();

//importing fn from controllers
const { getAllUsers, getByID, newUser, updateByID, addFriend, removeFriend, deleteUser } = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers).post(newUser).delete(deleteUser);

// api/users/:userID
router.route('/:userID').get(getByID).put(updateByID);

// api/users/friend/:userID params is the user, req.body.friendID will be the user to add
router.route('/friend/:userID').put(addFriend).delete(removeFriend);


module.exports = router;