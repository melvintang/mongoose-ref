// import Node.js packages: specify the dependencies

// import the Express module to use an express server: Express is a function.
var express = require('express')

// Create an instance of the Express server's router for creating routes
var router = express.Router()
// Important! - ../means specific to get out of folder routes for require function
var Salesperson = require('../models/salesperson')

// Middleware: for a get request at route = '/salespersons', response sent back = string
// type 1 read: get all salespersons detailed
router.get('/', function (req, res) {
  // res.send('all salespersons details')
  // Using Mongoose: Salesperson is a collection, not a specific schema!
  // Using Mongoose method: Signature of a movie find
  // Model.find({field/property}, callback(err, data))
  // As in a Salesperson collection, u can find schemas => an array
  Salesperson.find({}, function (err, salespersonsArr) {
    // res.send(salespersonsArr)
    if (err) throw new Error(err)
    // Render a ejs/html view, naturally at views folder due to view engine
    // 2nd input of render view: = object = {html part: data type}
    res.render('salespersons/index', {
      personsArr: salespersonsArr,
      name: 'Melvin'
    })
  })
  // render the view from a html file in ejs
  // res.render('salespersons/index')
})


// type 3 create: create new salesperson at route = '/salespersons/new' to override type2
router.get('/new', function (req, res) {
  // res.send('new salesperson form')
  // render the view from a html file in ejs
  res.render('salespersons/new')
})

// Middleware: for a get request at route = '/salespersons/id', response sent back = string
// type 2 read: get 1 book detail only
router.get('/:id', function (req, res) {
  // req.params is an object with propery id = id from url
  // example:
  // var req = {
  // params: {id: 5}
  // }
  // req.params.id: output = 5
  // Another eg: To find by ID
  // Eg. Trainer.findById(req.params.id, function(err, trainers)){
  // var pikachu = new Pokemon , trainer_id: trainer.id to create new pokemon}
  // where req.params.id = id in the get request url
  // => you are passing trainer object ID and run node app.s to find the trainers by objectID
  res.send("salesperson's " + req.params.id + ' details')
})


// type 4 create: add new salesperson at route = '/salespersons'
router.post('/', function (req, res) {
  // res.send('post salesperson form')
  // req.body holds parameters that are submitted (in form) as a post request.
  // eg: req.body bodyparsed as an object of objects
  // req.body[]
  // res.send(req.body)
  var newSalesperson = new Salesperson({
    name: req.body.salesperson.name,
    region: req.body.salesperson.region,
    power: req.body.salesperson.power
  })

  // console.log(newMovie)
  newSalesperson.save(function (err) {
    if (err) throw new Error(err)
  })
  // Do GET at /salespersons, Salesperson.findById(req, params.id), CB function(err, data)
  // data = params.id and render a view, object
  // res.redirect('/salespersons')
  res.send(newSalesperson)
})

// type 5 update: edit an existing salesperson's details at route: salespersons/id/edit
router.get('/:id/edit', function (req, res) {
  res.send("edit salesperson's " + req.params.id + ' details')
})
// type 6 update: updated existing salesperson's details at route: salespersons/id
router.put('/:id', function (req, res) {
  res.send('edit salesperson' + req.params.id)
})

// type 7 delete: To delete an existing salesperson's details at route: salespersons/id
router.delete('/:id', function (req, res) {
  res.send('delete salesperson' + req.params.id)
})

module.exports = router
