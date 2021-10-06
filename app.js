const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./config/mongoose')
// Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數

const routes = require('./routes')    // 引用路由器，預設會自動去找指定目錄下的 index 檔案
const app = express()


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})