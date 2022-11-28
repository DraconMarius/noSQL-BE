const router = require('express').Router();
const usersRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');
const reactRoutes = require('./reactRoutes');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/react', reactRoutes);

module.exports = router;
