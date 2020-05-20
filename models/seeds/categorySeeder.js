const mongoose = require('mongoose')
const Record = require('../Record') // 載入  model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(
      {
        'category':'家居物業',
        'icon':'<i class="fas fa-home"></i>'

      },
      {
        'category':'交通出行',
        'icon':'<i class="fas fa-shuttle-van"></i>'
      },
      {
        'category':'休閒娛樂',
        'icon':'<i class="fas fa-grin-beam"></i>'
      },
      {
        'category':'餐飲食品',
        'icon':'<i class="fas fa-utensils"></i>'
      },{
        'category':'其他',
        'icon':'<i class="fas fa-pen"></i>'
      }
      )
})