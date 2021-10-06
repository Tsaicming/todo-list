/******* todos 路由器 *******/

const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo') // 載入 Todo model

// **************** 新增 todo **************** //
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name          // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })        // 存入資料庫
    .then(() => res.redirect('/'))        // 新增完成後導回首頁
    .catch(error => console.log(error))   // 錯誤處理
})

// **************** 查看特定 todo  **************** //
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)            //從資料庫查找出資料
    .lean()                           //把資料轉換成單純的 JS 物件
    .then((todo) => res.render('detail', { todo })) //把資料送給前端樣板
    .catch(error => console.log(error))             //錯誤處理
})

// **************** 修改 todo 資料 **************** //
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body   // 拿出 body 內定義好的 name、isDone 給 name、isDone
  // 等同這個寫法
  // const name = req.body.name
  // const isDone = req.body.isDone

  return Todo.findById(id)            //查詢資料
    .then(todo => {                   //如果查詢成功，重新儲存修改後的資料，否則到 .catch 錯誤處理
      todo.name = name
      todo.isDone = isDone === 'on'
      // 等同這個寫法
      // if (isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo. isDone = false
      // }

      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))  //如果儲存成功後，導向首頁，否則到 .catch 錯誤處理
    .catch(error => console.log(error))
})

// **************** 刪除 todo 資料 **************** //
router.delete('/:id', (req, res) => {
  const id = req.params.id                     // id = 查詢出使用者想刪除的 todo 的 id
  return Todo.findById(id)                     //資料庫查詢成功後，把資料放進 todo
    .then(todo => todo.remove())               //用 todo.remove() 刪除這筆資料
    .then(() => res.redirect('/'))             //成功刪除以後，使用 redirect 重新呼叫首頁
    .catch(error => console.log(error))
})

module.exports = router