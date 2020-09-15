const router = require('express').Router();
const { getUserToken, showCodeToUser } = require('../controllers/auth.controller');

router.get('/', showCodeToUser);

router.post('/get-token', getUserToken);

module.exports = router;