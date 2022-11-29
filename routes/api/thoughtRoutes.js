const router = require('express').Router();

//importing fn from controllers
const { getAllThought, getByID, newThought, updateByID, deleteThought } = require('../../controllers/thoughtController');

// api/users
router.route('/').get(getAllThought).post(newThought)

// api/users/:userID
router.route('/:thoughtID').get(getByID).put(updateByID).delete(deleteThought);

module.exports = router;