var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = mongoose.Schema({
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
})
// For database: use middleware to do stacking- using cb function next
// When a new user is loaded, we store password as hash, not as original text anymore
// can run db.users.find({}) to see the hashed object.

// userschema.pre => before hook 'save'(like eventlistener), a command
// before you save the new user (in the form), do something
// hashinf with salt takes time, so need CB functions to prevent blocking,
// next() to go to next line in stacking

userSchema.pre('save', function (next) {
  console.log('before save hash the password')
  console.log(this)

  var user = this

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      console.log('after hash')
      console.log(user)
      next()
    })
  })
})

// A middleware to save(hook) after posting the new user
userSchema.post('save', function () {
  // console.log('after the save, save successful')
})

userSchema.methods.sayName = function () {
  // console.log(this)
  // console.log('hey i can call say name from an instance')
  // console.log('my name is ' + this.local.email)
  // console.log('my password is ' + this.local.password)
}

// The authenticate method of userSchema
userSchema.methods.auth = function (password, callback) {
  console.log('given password is ' + password)
  console.log('saved password is ' + this.local.password)
  // Inside this authenticate method, you have bcrypt.compare method
  // which compares the keyed hashed password vs the already hased password
  var hashedPassword = this.local.password
  bcrypt.compare(password, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}



var User = mongoose.model('User', userSchema)

module.exports = User

// Create a newUser, an instance of userSchema
var newUser = new User({
  local: {
    email: 'primaulia@gmail.com',
    password: 'test123'
  }
})

// save the newUser and do the CB function: newUSer = saved
newUser.save(function (err, newUser) {
  if (err) console.log(err.message)
  // console.log('new user saved')
  newUser.auth('test123', function (err, authenticated) {
    if (err) console.log('not authenticated')
    console.log('auth is ' + authenticated)
    if (authenticated) console.log('user is authenticated')
  })
  // User.findOne({ local: { email: 'primaulia@gmail.com' } }, function (err, user) {
  //   user.authenticate('test123', function (err, authenticated) {
  //     if (err) console.log('not authenticated')
  //     console.log('auth is ' + authenticated)
  //     if (authenticated) console.log('user is authenticated')
  //   })
  // })
})

// newUser.sayName()
