const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const QuoteSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  sentence: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type:String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('quotes', QuoteSchema)