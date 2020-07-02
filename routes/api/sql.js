const express = require('express');
const router = express.Router();
// Controllers
const { requireSignIn } = require('../../controllers/auth');
const {
  codeById,
  create,
  list,
  read,
  update,
  remove
} = require('../../controllers/sql');
const { userById } = require('../../controllers/user');

// sql_code routes
router.post('/sql_code/create/:userId', requireSignIn, create);
router.get('/sql_code/list/:userId', requireSignIn, list);
router.get('/sql_code/single/:codeId', requireSignIn, read);
router.put('/sql_code/update/:codeId/:userId', requireSignIn, update);
router.delete('/sql_code/remove/:codeId/:userId', requireSignIn, remove);

// Parameter from URL
router.param('userId', userById);
router.param('codeId', codeById);

module.exports = router;
