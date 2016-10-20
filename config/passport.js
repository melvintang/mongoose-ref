var passport = require('passport')
// passport-local use different methods
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

// for session management
passport.serializeUser((user, done), function(){
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user) {
    done (err, user)
  })
})

// middleware: local-signup:
passport.use('local-signup', new LocalStrategy ({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, next) {
  // the authentication flow on our local auth routes


}))
