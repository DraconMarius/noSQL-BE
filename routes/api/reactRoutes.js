const router = require('express').Router();

//importing fn from controllers
const { addReact, deleteReact } = require("../../controllers/reactController")


// api/react/:userID for post 
router.route('/:thoughtID').post(addReact);

//api/react/:reactID for delete
router.route('/:thoughtID/:reactID').delete(deleteReact);

module.exports = router;