const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ensureAuthentication} = require('../helpers/auth')

// load helper


// Load Quote Model
require('../models/Quotes')
const Quote = mongoose.model('quotes')

router.get('/', ensureAuthentication, (req, res) => {
  Quote.find({user: req.user.id})
    .sort({ date: 'desc' })
    .then(quotes => {
      res.render('pages/quotes', {
        quotes: quotes
      })
    })
})

router.get('/add', ensureAuthentication, (req, res) => {
  res.render('quotes/add')
})

// edit quotes
router.get('/edit/:id', ensureAuthentication, async (req, res) => {
  try {
    Quote.findOne({
      _id: req.params.id
    }).then(quote => {
      if(quote.user != req.user.id) {
        req.flash('error_msg', 'Not authorized')
        res.redirect('/quotes')
      } else {
        res.render('quotes/edit', {
          quote: quote
        })
      }
    })
  } catch (error) {
    res.render('quotes')
  }
})

// post quotes
router.post('/', ensureAuthentication, (req, res) => {
  let errors = []

  if (!req.body.author) {
    errors.push({ text: 'Please add an author! &#x1F9D8;' })
  }
  if (!req.body.sentence) {
    errors.push({ text: 'Please add a quote!' })
  }
  if (errors.length > 0) {
    res.render('quotes/add', {
      errors: errors,
      author: req.body.author,
      sentence: req.body.sentence
    })
  } else {
    const newQuote = {
      author: req.body.author,
      sentence: req.body.sentence,
      user: req.user.id
    }
    console.log(newQuote)
    new Quote(newQuote)
      .save()
      .then(quote => {
        req.flash('success_msg', 'Frase foi adicionada com sucesso.')
        res.redirect('/quotes')
      })
  }
})

router.put('/:id', ensureAuthentication, (req, res) => {
  Quote.findOne({
    _id: req.params.id
  })
    .then(quote => {
      quote.author = req.body.author,
        quote.sentence = req.body.sentence

      quote.save()
        .then(qt => {

          res.redirect('/quotes')
        })
    })
})

router.delete('/:id', ensureAuthentication, (req, res) => {
  Quote.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Frase foi removida com sucesso.')
      res.redirect('/quotes')
    })
})

module.exports = router
