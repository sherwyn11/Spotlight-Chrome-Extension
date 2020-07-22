const router = require('express').Router();
const { getUserToken } = require('../controllers/auth.controller');

router.post('/get-token', getUserToken);

module.exports = router;