const express = require('express')
const app = express()
const connectDB = require('./config/db')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const contactRoute = require('./routes/contact')

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to Contact Keeper API' })
})

// Define our rotes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/contacts', contactRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
