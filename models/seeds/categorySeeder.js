if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../Category')
const db = require('../../config/mongoose')

const categoryList = [
  { name: '家居物業', id: '01', icon: '<i class="fas fa-home"></i>' },
  { name: '交通出行', id: '02', icon: '<i class="fas fa-shuttle-van"></i>' },
  { name: '休閒娛樂', id: '03', icon: '<i class="fas fa-grin-beam"></i>' },
  { name: '餐飲食品', id: '04', icon: '<i class="fas fa-utensils"></i>' },
  { name: '其他', id: '05', icon: '<i class="fas fa-pen"></i>' }
]

db.once('open', () => {

   Promise
   .all(Array.from(
    { length: 5 },
    (_, i) => Category.create({
      name: categoryList[i].name, id: categoryList[i].id, icon: categoryList[i].icon,
    })
  ))

  .then(() => {
    console.log('done')
    db.close()  
  })
  
})

