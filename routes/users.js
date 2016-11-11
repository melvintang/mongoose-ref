var express = require('express')
var router = express.Router()


var User = require('../models/user')

router.get('/', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('users/index', {
      allUsers: allUsers
    })
  })
})

router.get('/signup', function (req, res) {
  res.render('users/signup')
})

router.post('/signup', function (req, res) {
  var newUser = new User({
    local: {
      email: req.body.user.local.email,
      password: req.body.user.local.password
    }
  })
  newUser.save(function (err, savedUser) {
    if (err) throw new Error(err)
    res.redirect('/profile')
  })
})

router.get('/login', function (req, res) {
  res.render('users/login', { message: req.flash('loginMessage') })
})

router.get('/profile', function (req, res) {

  res.render('users/profile', { message: req.flash('loginMessage') })
})

router.get('/error', function (req, res) {
  res.render('users/error', { message: req.flash('loginMessage') })
})

router.post('/login', function (req, res) {
  var user = req.body.user

  User.findOne({ 'local.email': user.local.email }, function (err, foundUser) {
    if (err) res.send(err.message)

    if (foundUser) {
      foundUser.authenticate(user.local.password, function (err, authenticated) {
        if (err) res.send(err)

        if (authenticated) {
          // if application is validated
          req.flash('loginMessage', 'Congratulations! You are logged in')
          res.redirect('/profile')
        } else {
          // if application cannot find user by email
          req.flash('loginMessage', 'wrong password!')
          res.redirect('/error')

        }
      })
    } else {
      // if application cannot find user by email
      req.flash('loginMessage', 'Email not found!')
      res.redirect('/login')
    }
  })
})

module.exports = router
