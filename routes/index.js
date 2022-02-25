var express = require('express');
var router = express.Router();

const passport =require('passport');

/* GET home page. */
router.get('/s', function(req, res, next) {
  console.log("XD")
  res.json({user:"XD"})
});

/*Login*/

router.post('/login')

module.exports = router;
