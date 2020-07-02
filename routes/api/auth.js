const express = require('express');
const router = express.Router();
// Controllers
const {
  signup,
  signin,
  signout,
  requireSignIn
} = require('../../controllers/auth');
const { userById, removeUser } = require('../../controllers/user');
const { codeById } = require('../../controllers/sql');
// Validation
const { signupValidator, signinValidator } = require('../../validators');

// Routes w/ controllers and middleware
router.post('/auth/signup', signupValidator, signup);
router.post('/auth/signin', signinValidator, signin);
router.get('/auth/signout', signout);
router.delete('/auth/remove/:userId', requireSignIn, removeUser);

router.param('userId', userById);
router.param('sql_codeId', codeById);

module.exports = router;
