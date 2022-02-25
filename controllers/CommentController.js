const async = require("async");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.comment_create = [
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment must be at least 1 character")
    .isLength({ max: 500 })
    .withMessage("Cannot be more than 500 characters!")
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const commentErr = errors.array()[0].msg;
      res.json({ errors: { commentErr } });
    } else {
      const newComment = new Comment({
        user: req.user._id,
        post: req.params.id,
        comment: req.body.comment,
        timestamp: Date.now(),
      }).save((err, comment) => {
        if (err) return next(err);
        Post.findByIdAndUpdate(
          req.params.id,
          { $push: { comment: comment._id } },
          { upsert: true, new: true }
        ).exec((err, saved) => {
          if (err) return next(err);
          res.status(200).json("Success");
        });
      });
    }
  },
];
