const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs/dist/bcrypt')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
// const auth = require('../middleware/auth')
const User = require('../models/Users')

//@router       GET api/auth
//@desc         Get logged in User
//@access       Private

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

//@router       POST api/auth
//@desc         Auth user and get token
//@access       Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const message = errors.array().map((msg) => {
        return msg.msg
      })
      return res
        .status(400)
        .json({ errors: 'Please provide valid email and password' })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
