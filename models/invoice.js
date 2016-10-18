var mongoose = require('mongoose')
// This was my problem.
// `.` is your current directory
// `/` is the root directory
// unnecessay to declare Salesperson as Salesperson is part of Mongoose model
// var Salesperson = require('./salesperson')
// This was my problem.
var Schema = mongoose.Schema;
// create a schema for Invoices Collection
var invoiceSchema = new mongoose.Schema({
  // prop: Datatype
  name: String,
  power: Number,
  salesPersonId: { type: Schema.Types.ObjectId, ref: 'Salesperson' }
})

// create a Invoices Collection
var Invoice = mongoose.model('Invoice', invoiceSchema)

// Make Invoice Collection as an export
module.exports = Invoice
