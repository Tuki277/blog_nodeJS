var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("object");
  res.render('page/index', { title: 'index' });
});

module.exports = router;
