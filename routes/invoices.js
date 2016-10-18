// import Node.js packages: specify the dependencies

// import the Express module to use an express server: Express is a function.
var express = require('express')

// Create an instance of the Express server's router for creating routes
var router = express.Router()
var Salesperson = require('../models/salesperson')
var Invoice = require('../models/invoice')

// Middleware: for a get request at route = '/invoices', response sent back = string
// type 1 read: get all salespersons detailed
router.get('/', function (req, res) {
  // res.send('all invoices details')
  // render the view from a html file in ejs
  // Eg by doing this, just call 1 collection using find,populate and exec:
  // Pokemon. findOne({name: 'Ash'}).populate('trainer_id').exec(function(err, pokemon)) {if err return err}
  // console.log(pokemon), then run node app.js to show the pokemon joined details
  res.render('invoices/index')
})

// type 3 create: create new invoice at route = '/salespersons/new' to override type2
router.get('/new', function (req, res) {
  // res.send('new salesperson form')
  // render the view from a html file in ejs
  res.render('invoices/new')
})
// 1 example of getting a pikachu
router.get('/pikachu', function (req, res) {
  Invoice
  .findOne({name: "melvin7"})
  .populate('salesPersonId')
  .exec(function (err, invoice) {
    if (err) return err
    console.log(invoice)
  })

  res.send('return pikachu with trainer details')
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
  res.send("invoice's " + req.params.id + ' details')
})


// type 4 create: add new salesperson at route = '/salespersons'
router.post('/', function (req, res) {
  // res.send('post salesperson form')
  // req.body holds parameters that are submitted (in form) as a post request.
  // eg: req.body bodyparsed as an object of objects
  // req.body[]
  // you should first find the salesperson (either by id or by any field)
  // Note: you can use Salesperson.find in router.get()
  // Eg. Trainer.find({}, function (err, trainersArray))
  // Then node app.js will give you the trainers
  Salesperson.findOne({name: 'Melvin Tang'}, function(err, person) {
    var newInvoice = new Invoice({
      name: req.body.invoice.name,
      power: req.body.invoice.power,
      salesPersonId: person.id
    })
    newInvoice.save()
    // send the object here!
    res.send(newInvoice)
  })
  // Do not send object here as it will be undefined.
  // res.send(newInvoice)

  // Example of under Get response at url = /invoices
  // Trainer.findOne({name: 'Ash Ketchum'}, function (err, trainer) {
  //   console.log('trainers are')
  //   console.log(trainer, trainer.id)
  //
  //   var pikachu = new Pokemon({
  //     name: 'Pikachu',
  //     kind: 'Electric',
  //     power: 40,
  //     trainer_id: trainer.id
  //   })
  //
  //   pikachu.save()
  // })
  //
  // res.send('pokemon index page')
})

// type 5 update: edit an existing salesperson's details at route: salespersons/id/edit
router.get('/:id/edit', function (req, res) {
  res.send("edit invoice's " + req.params.id + ' details')
})
// type 6 update: updated existing salesperson's details at route: salespersons/id
router.put('/:id', function (req, res) {
  res.send('edit invoice' + req.params.id)
})

// type 7 delete: To delete an existing salesperson's details at route: salespersons/id
router.delete('/:id', function (req, res) {
  res.send('delete invoice' + req.params.id)
})



module.exports = router
