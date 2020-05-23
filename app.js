const express = require('express')//載入express並架設伺服器
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/Record')//載入資料
const Category = require('./models/Category')//載入資料
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')// 載入 method-override
const PORT = process.env.PORT || 3000
const routes = require('./routes')// 引用路由器
require('./config/mongoose')


app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'))// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(routes)// 將 request 導入路由器

//設定前端模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定路由監聽器
app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})