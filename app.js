const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo') // 載入 Todo model
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

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

app.get('/', (req, res) => {
  Todo.find()                    // 取出 Todo model 裡的所有資料
    .lean()                      // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos }))  // 將資料傳給 index 樣板
    .catch(error => console.error(error))           // 錯誤處理
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name          // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })        // 存入資料庫
    .then(() => res.redirect('/'))        // 新增完成後導回首頁
    .catch(error => console.log(error))   // 錯誤處理
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)            //從資料庫查找出資料
    .lean()                           //把資料轉換成單純的 JS 物件
    .then((todo) => res.render('detail', { todo })) //把資料送給前端樣板
    .catch(error => console.log(error))             //錯誤處理
})