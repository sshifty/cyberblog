const async = require("async");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comments = require("../models/Comment");

//Get all posts
exports.posts_get = function (req, res, next) {
  Post.find()
    .sort({ timestamp: "desc" })
    .populate('user')
    .exec((err, foundPosts) => {
      if (err) return next(err);
      if (foundPosts === null) {
        return res.status(404).json({ status: "No posts found" });
      }
      return res.status(200).json({ posts: foundPosts });
    });
};

//Get  post
exports.post_get = function (req, res, next) {
  async.parallel(
    {
      post: function (cb) {
        Post.findById(req.params.id).populate("user").exec(cb);
      },
      comment: function (cb) {
        Comments.find({ post: req.params.id }).populate('user').sort({timestamp:'desc'}).exec(cb);
      },
    },
    function (err, results) {
      console.log(err)
      if (err) res.status(501).json({status:"invalid id"});
      if (results.post === null) {
        res.status(404).json({ status: "No post with this id" });
      } else {
        res.json({ post: results.post, comment: results.comment });
      }
    }
  );
};

//Crate post
exports.post_create = [
  body("title")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters")
    .isLength({ max: 20 })
    .withMessage("Title cannot be more than 20 characters")
    .escape(),
  body("message")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Post must be at least 2 characters")
    .isLength({ max: 4000 })
    .withMessage("Title cannot be more than 4000 characters")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    let titleErr, messageErr;
    if (!errors.isEmpty()) {
      for (let err of errors.array()) {
        switch (err.param) {
          case "title":
            titleErr = err.msg;
            break;
          case "message":
            messageErr = err.msg;
            break;
        }
      }
      res.json({ errors: { titleErr, messageErr } });
    } else {
      const newPost = new Post({
        user: req.user._id,
        post: req.body.message,
        title: req.body.title,
        timestamp: Date.now(),
      }).save((err) => {
        if (err) return next(err);
        res.json({ status: "Success post", post: newPost });
      });
    }
  },
];
