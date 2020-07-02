const express = require('express');
const router = express.Router();
// Controllers
const { requireSignIn } = require('../../controllers/auth');
const {
  sql_codeById,
  create,
  list,
  read,
  update,
  remove
} = require('../../controllers/sql');
const { userById } = require('../../controllers/user');

// sql_code routes
router.post('/sql_code/create/:userId', requireSignIn, create);
router.get('/sql_code/:userId', requireSignIn, list);
router.get('/sql_code/:sql_codeId', requireSignIn, read);
router.put('/sql_code/:sql_codeId/:userId', requireSignIn, update);
router.delete('/sql_code/:sql_codeId/:userId', requireSignIn, remove);

// Parameter from URL
router.param('userId', userById);
router.param('sql_codeId', sql_codeById);

module.exports = router;
