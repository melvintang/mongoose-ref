var mongoose = require('mongoose')

// create a schema for Salespersons Collection
var salespersonSchema = new mongoose.Schema({
  // prop: Datatype
  name: String,
  region: String,
  power: Number
})

// create a Salespersons Collection
var Salesperson = mongoose.model('Salesperson', salespersonSchema)

module.exports = Salesperson
