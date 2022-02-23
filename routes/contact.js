const express = require('express')
const router = express.Router()

// @route    GET api/contacts
// @desc     Get all users contacts
// @access   Private

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Get all contacts' })
})

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private

router.post('/', (req, res) => {
  res.status(200).json({ msg: 'Add contact' })
})

// @route    PUT api/contacts/:id
// @desc     Update contacts
// @access   Private

router.put('/:id', (req, res) => {
  res.status(200).json({ msg: 'Update contact' })
})

// @route    DELET api/contacts/:id
// @desc     Delete contacts
// @access   Private

router.delete('/:id', (req, res) => {
  res.status(200).json({ msg: 'Delete contact' })
})

module.exports = router
