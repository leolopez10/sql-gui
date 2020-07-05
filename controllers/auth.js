const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // to check for authentication
const bcrypt = require('bcryptjs'); // to check for password match
const { validationResult } = require('express-validator'); // validation for user sign in and sign up
const { errorHandler } = require('../helpers/dbErrorHandler');

// Model
const User = require('../models/user');

// @route   POST api/auth/signup
// @desc    Create auth by user Id
// @access  Public
exports.signup = (req, res) => {
  //   res.json(req.body);

  // Handle validation errors for signing up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Create new user and save to database
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.password = undefined;

    // Generate user token to login user immediately after signing up
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 'x-auth-token' in cookie with expiry date
    res.cookie('x-auth-token', token, { expiresIn: 3600 }); // 3600 is an hour
    //return response with user and token to frontend client
    return res.status(200).json({ token, user });
  });
};

// @route   POST api/auth/signup
// @desc    Create auth by user Id
// @access  Public
exports.signin = (req, res) => {
  // res.json(req.body);

  // Handle validation errors for signing up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // find the user based on username
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: 'User does not exist. Please sign-up'
      });
    }

    // If user is found check password for a match
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate user token to login user immediately after signing in
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 'x-auth-token' in cookie with expiry date
        res.cookie('x-auth-token', token, { expiresIn: 3600 }); // 3600 is an hour
        //return response with user and token to frontend client
        const { _id, username } = user;
        return res.status(200).json({
          token,
          user: {
            _id,
            username
          }
        });
      })
      .catch(err => res.status(400).json(err));
  });
};

// @route   GET api/auth/signout
// @desc    sign out and destroy token and session
// @access  Private
exports.signout = (req, res) => {
  res.clearCookie('x-auth-token');
  res.json({ msg: 'Sign-out successful' });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
});
