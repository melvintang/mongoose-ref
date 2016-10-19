// import Node.js packages: specify the dependencies

// import the Express module to use an express server: Express is a function.
// require takes the name of a package as its string input and returns a package
var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
// import mongoose, an ORM app to access MongoDB(datastore)
var mongoose = require('mongoose')
var layout = require('express-ejs-layouts')
var dotenv = require('dotenv')


// Create an instance of the Express server

// Calls the express function "express()" and puts new Express app as var app
// similar to creating an object of a class
// where express() is just like class and app is its new created object.
var app = express()

var port = 4000

// Import the routes which are web addresses / URLs:
// require takes the name of the file in .js and returns the file.
// Make sure requre function looks out of the default node_modules folder use ./

var salespersons_routes = require('./routes/salespersons')
var invoices_routes = require('./routes/invoices')
var frontendRoutes = require('./routes/users')
var ajaxRoutes = require('./routes/users_api')

// set the view engine to ejs where 1st input = setting, 2nd = value
// app.set() is to set value (ejs) for a filename so that app.get() could get the value by filename.
app.set('view engine', 'ejs')
console.log ('View engine is ', app.get('view engine'))
// Filter all requests with express layout
app.use(layout)

// Middleware: for a request at url '/', do the direct app.get(),
// and access static files in public folder.
// app.get() at another url can also access the static files in the public folder.
app.use(express.static(__dirname + '/public'))

// Middleware: For all requests, parses the text as URL encoded data/json objects
// U want to use bodyparser before u do app.use
app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
}))

// Middleware: run methodOverride for put requests
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// Middleware: for all specfic requests (get, put, post, delete) and routes at url = '/books' onwards,
// compare the specific requests and routes to app.get inputs, if the same,
// do the specific app.get() method.
// app.use does the app.get() method by order,
// app.use needs cb function next() to go to next request.
app.use('/salespersons', salespersons_routes)
app.use('/invoices', invoices_routes)
app.use('/users', frontendRoutes) // only render ejs files
app.use('/api/users', ajaxRoutes) // only handle ajax request


// To avoid odd error handling behaviour
mongoose.Promise = global.Promise
// connect to MongoDB:a collection called data (not yet saved as collection) via localhost(this PC)
// mongoose.connect('mongodb://localhost/data')
//console.log('the environment is on ' + process.env.NODE_ENV)

// if (process.env.NODE_ENV === 'production') {
//   mongoose.connect('mongodb://wdi6:Patrick786@ds061076.mlab.com:61076/wdi6')
// } else {
//   mongoose.connect('mongodb://localhost/data')
// }

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)
// app.get('/one_collection', function(){
//
//   parent.save()
// })
//
// app.get('/one_to_one_collection', function(){
//   parent.save()
// })
//
// app.get('/one_to_many_collection', function(){
//   parent.save()
// })

// Using mongoose to create objects directly!!! Use node app.js to run new submissions of new object ids.
// pass objects directly into schema
// A parent can have many children
var childSchema = new mongoose.Schema ({
  name: String,
  email: String
})

var parentSchema = new mongoose.Schema ({
  name: String,
  email: String,
  // Important: A parent has an array of children. Each child is a schema
  child: [childSchema]
})

// After building schema, do collections
var Parent = mongoose.model('Parent', parentSchema)

var parent = new Parent({
  name: 'Melvin',
  email: 'tchatpeng@gmail.com',
  child: [
    {
      name: 'Andy',
      email: 'andy@gmail.com'
    },
    {
      name: 'Sis',
      email: 'Sis@gmail.com'
    }
  ]
})


// app.get('/anotherGameRoute', function(req, res) {
//   res.render('index', {name: 'Pokemon Memory Game'})
// })

// Using users as a model:
// var User = require('./models/user')
//
// app.get('/users', function (req, res) {
//   User.find({}, function (err, users) {
//     if (err) res.send('something wrong happened' + err)
//     console.log(users)
//     res.render('users/index', { users: users })
//   })
// })

// app.get('/users/new', function (req, res) {
//   res.render('users/new')
// })
//
// app.post('/users', function (req, res) {
//   // req.body.user---object user comes from form- user[name] etc
//   User.create(req.body.user, function (err, haha) {
//     if (err) {
//       res.send('something wrong happened' + err)
//     } else {
//       console.log('post new user')
//       res.redirect('/users')
//     }
//   })
// })
//
// app.get('/users/:id', function (req, res) {
//   // use req.params.id as it refers to url:':id'
//   User.findById(req.params.id, function (err, data) {
//     // data refers to the user object.
//     res.send(data)
//   })
// })
//
// app.get('/users/:id/adopt', function (req, res) {
//   User.findByIdAndUpdate(req.params.id, { status: 'adopt' }, function (err, data) {
//     if (err) res.send('something wrong happened' + err)
//
//     console.log('change the status of ' + data.name + ' by the given id to adopt')
//     res.redirect('/users')
//   })
// })
//
// app.get('/users/:id/abandon', function (req, res) {
//   User.findByIdAndUpdate(req.params.id, { status: 'orphan' }, function (err, data) {
//     if (err) res.send('something wrong happened' + err)
//
//     console.log('change the status of ' + data.name + ' by the given id to orphan')
//
//     res.redirect('/users')
//   })
// })


// Tell the express server to listen for connections at port 4000
// app.listen(4000)
app.listen(process.env.PORT || 3000)
console.log('Server running at http://localhost:' + port + '/')
