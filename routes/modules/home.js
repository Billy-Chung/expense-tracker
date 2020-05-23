const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')//載入資料
const Category = require('../../models/Category')//載入資料

// 首頁
router.get('/', (req, res) => {
    let totalAmount = 0
    Record.find()
        .lean()
        .then( //資料庫裡的每個項目的金額全部加總，帶入參數totalAmount
            items => {
                items.forEach(item => {
                    totalAmount += item.amount
                    let cat_id = item.category
                    let cat_obj = Category.find({ id: cat_id }).lean().then(
                        xxx => {
                            item.icon = xxx[0].icon
                            return item
                        }
                    )
                })
                return items
            }
        )
        .then()
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
})

module.exports = router