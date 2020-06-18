const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')//載入資料
const Category = require('../../models/Category')//載入資料


// 首頁
router.get('/', (req, res) => {
    const userId = req.user._id
    let totalAmount = 0
    Record.find({userId })
        .lean()
        .then(items => {
            items.forEach(item => {
                totalAmount += item.amount
                let cat_id = item.category
                Category.find({ id: cat_id }).lean().then(
                    xxx => {
                        item.icon = xxx[0].icon
                        return item
                    }
                )
            })
            return items
        }
        )
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
})

module.exports = router