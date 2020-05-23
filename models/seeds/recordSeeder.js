const Record = require('../Record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  const myList = [
    { name: '午餐', category:'04', date: '2019/04/23', amount: 60, },
    { name: '晚餐', category:'04',date: '2019/04/23', amount: 60},
    { name: '捷運', category:'02',date: '2019/04/23', amount: 120},
    { name: '電影：驚奇隊長',category:'03',date: '2019/04/23', amount: 220},
    { name: '租金', category:'05',date: '2019/04/01', amount: 25000}
  ]
  
  myList.forEach(list => {
    Record.create({
      "name": list.name,
      "category": list.category,
      "icon":"",
      "date": list.date,
      "amount": list.amount,      
    })
  })
  console.log('record done')
})