const mongoose = require('mongoose')
const Record = require('../Record') // 載入  model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  const myList = [
    { name: '午餐', category: '04', date: '2019/04/23', amount: 60 },
    { name: '晚餐', category: '04', date: '2019/04/23', amount: 60 },
    { name: '捷運', category: '02', date: '2019/04/23', amount: 120 },
    { name: '電影：驚奇隊長', category: '03', date: '2019/04/23', amount: 220 },
    { name: '租金', category: '01', date: '2019/04/01', amount: 25000 }
  ]

  myList.forEach(list => {
    Record.create({
      "name": list.name,
      "category": list.category,
      "date": list.date,
      "amount": list.amount
    })
  })
  console.log('record done')
})