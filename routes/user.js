const express = require('express')
const router = express.Router()

// @route    POST api/users
// @desc     Register a user
// @access   Public

app.post('/register', (req, res) => {
  res.status(200).json({ msg: 'Register a user' })
})

module.exports = router
