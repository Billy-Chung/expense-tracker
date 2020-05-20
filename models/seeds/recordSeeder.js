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
          'name':"咖哩飯",
          'date':"2020/5/20",
          'amount':'60'

      },
      {
        'name':"牛肉飯",
        'date':"2020/5/20",
        'amount':'80'
      })
})