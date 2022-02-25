const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .select("+password")
      .exec((err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: {nameErr:"Incorrect username"} });
        } else {
          if (
            bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                // passwords match! log user in
                return done(null, user);
              } else {
                // passwords do not match!
                return done(null, false, { message: {pwErr:"Incorrect password" }});
              }
            })
          )
            return done(null, user);
        }
      });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);
