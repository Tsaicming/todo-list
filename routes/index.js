/******* 總路由器 *******/

const express = require('express')
const router = express.Router()  // 引入路由模組

const home = require('./modules/home')    // 引入 home 模組程式碼
const todos = require('./modules/todos')  // 引入 todos 模組程式碼

router.use('/', home)       // 如果 request 路徑是 / ，就執行 modules/home 裡的程式碼
router.use('/todos', todos) // 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組

module.exports = router  // 匯出路由器