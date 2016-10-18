var express = require('express')
var router = express.Router()

var User = require('../models/user')

router.get('/', function (req, res) {
  User.find({}, function (err, allUsers) {
    res.json(allUsers)
  })
})

// Very important: Public static file main.js -> click on form button -> posted!
router.post('/', function (req, res) {
  User.create(req.body.user, function (err, newUser) {
    res.json(newUser)
  })
})

module.exports = router
