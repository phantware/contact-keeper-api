const express = require('express')
const router = express.Router()

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Get logged in user' })
})

// @route    POST api/auth
// @desc     Auth user and  get token
// @access   Public

app.post('/', (req, res) => {
  res.status(200).json({ msg: 'Log in user' })
})

module.exports = router
