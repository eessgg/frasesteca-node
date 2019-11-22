const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/index')
})
// ---- about ----
router.get('/about', (req, res) => {
  res.render('pages/about')
})

module.exports = router