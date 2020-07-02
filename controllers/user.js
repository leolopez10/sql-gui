// Model
const User = require('../models/user');
const Sql_codes = require('../models/sql');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    user.password = undefined;
    next();
  });
};

exports.removeUser = async (req, res) => {
  try {
    // remove all of user sql_codes
    await Sql_codes.deleteMany({ user: req.profile._id });

    // delete user
    await User.findOneAndRemove({ _id: req.profile._id });

    res.status(200).json({
      msg: 'User deleted'
    });
  } catch (error) {
    res.status(500).send('Server Error: ' + error);
  }
};
