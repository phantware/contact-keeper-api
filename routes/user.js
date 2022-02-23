const express = require('express')
const router = express.Router()
const User = require('../models/Users')

// @route    POST api/users
// @desc     Register a user
// @access   Public

router.post('/register', (req, res) => {
  res.status(200).json({ msg: 'Register a user' })
})

module.exports = router
