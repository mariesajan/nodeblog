var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/nodeauth');

var posts = db.get('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
    posts.find({}, function(err, docs) {
        if (err) {
            throw err;
        } else {
            if (docs.length == 0) {
                docs = null;
            }
            //if there are records
            res.render('index', {
                posts: docs
            });
        }
    });
});

router.get('/titleDetails/:category', function(req, res, next) {
    posts.find({
        category: req.params.category
    }, function(err, docs) {
        if (err) {
            throw err;
        } else {
            if (docs.length == 0) {
                docs = null;
            }
            //if there are records
            res.render('index', {
                posts: docs
            });
        }
    });
});

module.exports = router;
