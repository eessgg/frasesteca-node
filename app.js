const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const app = express()
require('dotenv').config()


// ---- load routes ----
const quotes = require('./routes/quotes')
const users = require('./routes/users')
const index = require('./routes/index')

// Passport Config
require('./config/passport')(passport);
// DB Config
const db = require('./config/database');

// ---- DATABASE ----
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// // Load Quote Model
// require('./models/Quotes')
// const Quote = mongoose.model('quotes')

// ---- set the view engine to ejs ----
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(methodOverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

// gloabl flash messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

app.use('/', index)
app.use('/users', users)
app.use('/quotes', quotes)



const PORT = process.env.PORT || 3000
// listen port 3333
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`)
})