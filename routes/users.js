var express = require("express");
var router = express.Router();
const passport = require("passport");

const PostController = require("../controllers/PostController");
const CommentController = require("../controllers/CommentController");

//Get all posts
router.get("/posts", PostController.posts_get);

//Get One post

router.get("/post/:id", PostController.post_get);

//create post
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  PostController.post_create
);

//create comment
router.post(
  "/post/:id/comment",
  passport.authenticate("jwt", { session: false }),
  CommentController.comment_create
);

//router.post('/test',passport.authenticate('jwt', { session: false }),AuthController.test_post);

module.exports = router;
