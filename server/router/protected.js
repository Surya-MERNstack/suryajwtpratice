const verify = require('../router/verify');
const router = require('express').Router();

router.get('/', verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
