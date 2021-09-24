const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const app = express()
const db = mongoose.connection

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error !')
})

db.once('open', () => {
  console.log('mongodb connected !')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})