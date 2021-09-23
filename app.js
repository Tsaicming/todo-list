const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error !')
})

db.once('open', () => {
  console.log('mongodb connected !')
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})

app.get('/', (req, res) => {
  res.send('Hello')
})