const express = require('express')//載入express並架設伺服器
const app = express()
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')// 載入 method-override
const flash = require('connect-flash')
const routes = require('./routes')// 引用路由器
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
require('./config/mongoose')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') 
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

//設定前端模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'))// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(routes)// 將 request 導入路由器

//設定路由監聽器
app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})

