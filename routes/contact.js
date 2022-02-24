const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/Users')
const Contact = require('../models/Contact')

//@router       GET api/contacts
//@desc         Get all users contacts
//@access       Private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    })
    return res.json(contacts)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

//@router       POST api/contacts
//@desc         Add new contacts
//@access       Private

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
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
    const { name, email, phone, type } = req.body
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      })
      console.log('user', req.user.id)
      const contact = await newContact.save()
      return res.json(contact)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

//@router       PUT api/contacts/:id
//@desc         Update contacts
//@access       Private

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body

  //Build contact object
  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type
  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Make sure users own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    )
    return res.json(contact)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

//@router       DELETE api/contacts/:id
//@desc         Delete contacts
//@access       Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Make sure users own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
    await Contact.findByIdAndRemove(req.params.id)
    return res.json({ msg: 'Contact removed' })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router
