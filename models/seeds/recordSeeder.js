const Record = require('../Record')
const db = require('../../config/mongoose')

const myList = [
  { name: '午餐', category: '04', categoryname: '餐飲食品', date: '2019/04/23',month:'4', shop:'麥當勞', amount: 60, },
  { name: '晚餐', category: '04', categoryname: '餐飲食品', date: '2019/04/23',month:'4', shop:'吉野家', amount: 60 },
  { name: '捷運', category: '02', categoryname: '交通出行',date: '2019/04/23',month:'4', shop:'台北捷運', amount: 120 },
  { name: '電影：驚奇隊長', category: '03', categoryname: '休閒娛樂', date: '2019/04/23', month:'4', shop:'威秀影城', amount: 220 },
  { name: '租金', category: '05', categoryname: '其他',date: '2019/04/01',month:'4', shop:'房東', amount: 25000 }
]
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < myList.length; i++) {
    Record.create({
      'name': myList[i].name,
      'category': myList[i].category,
      'categoryname': myList[i].categoryname,
      'date': myList[i].date,
      'amount': myList[i].amount,
      'month':myList[i].month,
      'shop':myList[i].shop,
    })

  }
  console.log('record done')
})

