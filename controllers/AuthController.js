const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const async = require("async");
const { check, body, validationResult } = require("express-validator");

exports.signup_post = [
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters")
    .isLength({ max: 20 })
    .withMessage("username cannot be more than 20 characters.")
    .isAlphanumeric("en-US")
    .withMessage(" Username cannot contain non-alphanumeric character")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .escape(),
  body("confirm").trim().escape(),
  check("password")
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the password")
    .exists(),
  check(
    "confirm",
    "Password Confirmation field must have the same value as the password field"
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),

  (req, res, next) => {
    const errors = validationResult(req);
    let nameErr, pwErr, confErr;
    if (!errors.isEmpty()) {
      for (let err of errors.array()) {
        switch (err.param) {
          case "username":
            nameErr = err.msg;
            break;
          case "password":
            pwErr = err.msg;
            break;
          case "confirm":
            confErr = err.msg;
            break;
        }
      }
      res.status(400).json({ errors: { nameErr, pwErr, confErr } });
    } else {
      //Check if the username already exist
      User.findOne({
        username: { $regex: "^" + req.body.username + "$", $options: "i" },
      }).exec(function (err, founduser) {
        if (err) return next(err);

        if (founduser) {
          res.status(401).json({ errors: {nameErr:"Username already exist"} });
        } else {
          //No user found , register
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            // otherwise, store hashedPassword in DB
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            }).save((err) => {
              if (err) return next(err);
              res.json({ status: "Signed up", user: user });
            });
          });
        }
      });
    }
  },
];

//Login post
exports.login_post = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          info: info.message,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        // generate a signed son web token with the contents of user object and return it in the response

        const token = jwt.sign(
          { _id: user._id, username: user.username },
          "secret",
          { expiresIn: "5d" }
        );
        console.log({ user, token });

        return res.json({
          user: { id: user._id, username: user.username },
          token,
        });
      });
    })(req, res, next);
  },
];

//Logout

exports.logout_get = function (req, res, next) {
  console.log("USER:::", req.user);
  req.logout();

  res.json({ status: "Logged out susccesfully" });
};

