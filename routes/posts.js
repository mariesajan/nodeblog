var express = require('express');
var router = express.Router();

var db = require('monk')('localhost/nodeauth');

var posts = db.get('posts');
var categories = db.get('categories');

router.get('/', function(req, res, next) {
    res.send('Hello');
});



router.get('/addPost', function(req, res, next) {
    categories.find({}, function(err, categories) {
        if (err) throw err;
        else {
            res.render('addpost', {
                title: 'ADD POST',
                categories: categories
            });
        }
    });

});

router.post('/addCommentForm/:id', function(req, res, next) {
    var date = new Date();
    //console.log('in add comment form:' + postId);
    var comment = {
        'name': req.body.name,
        'email': req.body.email,
        'commentBody': req.body.commentBody,
        'commentdate': date
    };
    req.checkBody('name', 'Name should be entered').notEmpty();
    req.checkBody('email', 'Email should be entered').notEmpty();
    req.checkBody('email', 'Enter a valid email id').isEmail();
    req.checkBody('commentBody', 'Body should be entered').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        posts.find({
            _id: req.params.id
        }, function(err, docs) {
            res.render('show', {
                errors: errors,
                posts: docs,
                categories: categories,
                name: req.body.name,
                email: req.body.email,
                commentBody: req.body.commentBody
            });
        });
    } else {
        posts.update({
            _id: req.params.id
        }, {
            $push: {
                comments: comment
            }
        });
        req.flash('success', 'Comment added');
        res.redirect('/posts/show/' + req.params.id);
    }

});



router.get('/show/:id', function(req, res, next) {
    posts.find({
        _id: req.params.id
    }, function(err, docs) {
        if (err)
            throw err;
        if (docs.length == 0) {
            docs = null;
        }
        res.render('show', {
            posts: docs
        });
    });
});

router.get('/fullText/:postsBody', function(req, res, next) {
    res.redirect('/');
});

router.get('/addCategory', function(req, res, next) {
    res.render('addcategory', {
        title: 'ADD CATEGORY'
    });
});


router.post('/addPostForm', function(req, res, next) {
    req.checkBody('postTitle', 'Title should not be empty').notEmpty();
    req.checkBody('postBody', 'Body should not be empty').notEmpty();

    var date = new Date();

    var errors = req.validationErrors();

    if (req.file) { // use req.file when using .single
        var imageFileName = req.file.filename;
    } else {
        var imageFileName = 'noImage.png';
    }

    categories.find({}, function(err, categories) {
        if (errors) {
            console.log('errors found');
            console.log(categories);
            res.render('addpost', {
                categories: categories,
                errors: errors,
                postTitle: req.body.postTitle,
                category: req.body.category,
                postBody: req.body.postBody,
                mainImage: imageFileName,
                author: req.body.author
            });
        } else {
            posts.insert({
                postTitle: req.body.postTitle,
                category: req.body.category,
                postBody: req.body.postBody,
                mainImage: imageFileName,
                author: req.body.author,
                date: date
            }, function(err, docs) {
                if (err)
                    throw err;
                else {
                    req.flash('success', 'Post added');
                    res.redirect('/');
                }
            });
        }

    });


});


router.post('/addCategoryForm', function(req, res, next) {
    req.checkBody('categoryTitle', 'Title should not be empty').notEmpty();

    var errors = req.validationErrors();


    categories.insert({
        categoryTitle: req.body.categoryTitle,
    });
    req.flash('success', 'Category submitted');
    res.redirect('/');
});

module.exports = router;
