const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to Contact Keeper API' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
