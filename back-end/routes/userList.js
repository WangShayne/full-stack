var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
	res.json({
		title: "post,123"
	});
});

router.get('/', function (req, res, next) {
	res.json({
		title: "get,456"
	});
});

module.exports = router;