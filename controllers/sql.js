const { errorHandler } = require('../helpers/dbErrorHandler');

// Models
// const User = require('../models/user');
const Sql_code = require('../models/sql');

// Get sql_codeId from URL
exports.codeById = (req, res, next, id) => {
  Sql_code.findById(id).exec((err, code) => {
    if (err) {
      return res.status(400).json({
        error: 'SQL command not found'
      });
    }
    req.sql = code;
    next();
  });
};

// @route   POST api/sql_code/create/:userId
// @desc    Create sql_code by user Id
// @access  Private
exports.create = (req, res) => {
  // Get user information from URL params
  const user = req.profile;

  // Create new sql_code by signed in user
  const code = new Sql_code({
    user,
    title: req.body.title,
    sql_code: req.body.sql_code
  });

  // Save post information to database
  code.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Error saving to database'
      });
    }
    res.status(200).json(data);
  });
};

// @route   GET api/sql_code/list/:userId
// @desc    GET all of user sql_codes
// @access  Private
exports.list = (req, res) => {
  Sql_code.find({ user: req.params.userId })
    .sort({ date: -1 })
    .exec((err, codes) => {
      if (err) {
        return res.status(400).json({
          error: console.error(err)
        });
      }
      res.status(200).json(codes);
    });
};

// @route   GET api/sql_code/single/:codeId
// @desc    GET single sql_code by id
// @access  Private
exports.read = (req, res) => {
  return res.status(200).json(req.sql);
};

// @route   UPDATE api/sql_code/update/:codeId/:userId
// @desc    update sql_code by UserId and sql_codeId
// @access  Private
exports.update = (req, res) => {
  const code = req.sql;
  code.title = req.body.title;
  code.sql_code = req.body.sql_body;
  code.save((err, data) => {
    if (err) {
      return res.status(400).send(
        json({
          error: console.error(err)
        })
      );
    }
    res.status(200).json(data);
  });
};

// @route   DELETE api/sql_code/remove/:codeId/:userId
// @desc    Delete sql_code by id
// @access  Private
exports.remove = (req, res) => {
  const code = req.sql;
  code.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      msg: 'SQL code deleted'
    });
  });
};
