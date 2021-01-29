require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', router)

app.listen(port, () => {
  console.log(`Listening to PORT:${port}`)
})