const router = require('express').Router();

// Import Routes
const authRoutes = require('./api/auth');
const sqlRoutes = require('./api/sql');

// Routes to export to server
router.use('/api', authRoutes);
router.use('/api', sqlRoutes);

module.exports = router;
