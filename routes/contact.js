const express = require('express')
const router = express.Router()

// @route    GET api/contacts
// @desc     Get all users contacts
// @access   Private

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Get all contacts' })
})

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private

app.post('/', (req, res) => {
  res.status(200).json({ msg: 'Add contact' })
})

// @route    PUT api/contacts/:id
// @desc     Update contacts
// @access   Private

app.put('/:id', (req, res) => {
  res.status(200).json({ msg: 'Update contact' })
})

// @route    DELET api/contacts/:id
// @desc     Delete contacts
// @access   Private

app.delete('/:id', (req, res) => {
  res.status(200).json({ msg: 'Delete contact' })
})

module.exports = router
