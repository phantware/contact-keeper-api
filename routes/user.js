const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs/dist/bcrypt')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')

//@router       Post api/users
//@desc         Register User
//@access       Public

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
    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'User already exists' })
      }
      user = new User({
        name,
        email,
        password,
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()
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
          return res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

module.exports = router
