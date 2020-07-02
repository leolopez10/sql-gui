const { check } = require('express-validator'); // validation for user sign in and sign up

exports.signupValidator = [
  check('username', 'Username is required').not().isEmpty(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
];

exports.signinValidator = [
  check('username', 'Please include a valid username').not().isEmpty(),
  check('password', 'Password is required').exists()
];
