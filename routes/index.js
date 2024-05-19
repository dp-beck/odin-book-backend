var express = require('express');
var router = express.Router();

/* GET home page. DUMMY CONTENT CURRENTLY TO MAKE SURE TESTING WORKS*/
router.get('/', function(req, res, next) {
  res.json({ name: "frodo"});
});

module.exports = router;
