const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    require: true   // 設定為必填欄位
  },
  isDone: {
    type: Boolean,
    default: false  // 預設完成狀態為 false
  }
})

module.exports = mongoose.model('Todo', todoSchema)