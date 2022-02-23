const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { check, validationResult } = require('express-validator')

// @route    POST api/users
// @desc     Register a user
// @access   Public

router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a valid password with 6 or more characher'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    res.status(200).json({ msg: 'Register a user' })
  }
)

module.exports = router
