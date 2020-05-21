const mongoose = require('mongoose')
const Category = require('../Category') // 載入  model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  Category.create(
    { name: '家居物業', id: '01', icon: '<i class="fas fa-home"></i>' },
    { name: '交通出行', id: '02', icon: '<i class="fas fa-shuttle-van"></i>'},
    { name: '休閒娛樂', id: '03', icon: '<i class="fas fa-grin-beam"></i>'},
    { name: '餐飲食品', id: '04', icon: '<i class="fas fa-utensils"></i>'},
    { name: '其他', id: '05' ,icon:'<i class="fas fa-pen"></i>' }
  )

  console.log('category done')
})