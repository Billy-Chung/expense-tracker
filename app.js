//載入express並架設伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')
const Record = require('./models/Record')//載入資料
const Category = require('./models/Category')//載入資料
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//設定前端模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'))


// 首頁
app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then( //資料庫裡的每個項目的金額全部加總，帶入參數totalAmount
      items => {
        items.forEach(item=>{
          totalAmount += item.amount
        })
        return items
      }
    )
    .then(records => res.render('index', { records, totalAmount }))
    .catch(error => console.log(error))
})

//新增頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})

//新增路由
app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//進入ED路由
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

//儲存ED路由
app.put('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const date = req.body.date
  const category = req.body.category
  const amount = req.body.amount
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return todo.save()
    })
    .then(()=> res.redirect(`records/${id}`))
    .catch(error => console.log(error))
})

//刪除路由
app.delete('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//總金額
app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then( //資料庫裡的每個項目的金額全部加總，帶入參數totalAmount
      items => {
        items.forEach(item=>{
          totalAmount += item.amount
        })
        return totalAmount
      }
    )
    .then(records => res.render('index', { records, totalAmount }))
    .catch(error => console.log(error))
    
})

//設定路由監聽器
app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})