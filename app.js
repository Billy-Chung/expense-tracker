//載入express並架設伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override') 
// 引用路由器
const PORT = process.env.PORT || 3000


//設定前端模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'))

// 將 request 導入路由器
app.get('/', (req, res) => {
    res.render('index')
  })

//設定路由監聽器
app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})