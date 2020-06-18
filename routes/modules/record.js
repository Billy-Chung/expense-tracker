const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')//載入資料
const Category = require('../../models/Category')//載入資料

//新增頁面
router.get('/new', (req, res) => {
    return res.render('new')
})


//新增路由
router.post('/', (req, res) => {
    const userId = req.user._id
    if (!isNaN(req.body.amount) && !isNaN(req.body.month)) {
        const { name, date, category, amount, month } = req.body
        let categoryname = newCategoryname(category)
        return Record.create({ name, date, category, amount, categoryname, month, userId })     // 存入資料庫
            .then(() => res.redirect('/')) // 新增完成後導回首頁
            .catch(error => console.log(error))
    }
    else {
        const { name, date, category, amount } = req.body
        return res.render('new', { name, date, category, amount })
    }
})

//進入ED路由
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Record.findOne({ _id, userId})
        .lean()
        .then((record) => res.render('edit', { record }))
        .catch(error => console.log(error))
})

//儲存ED路由
router.put('/:id', (req, res) => {
    if (!isNaN(req.body.amount) && !isNaN(req.body.month)) {
        const userId = req.user._id
        const _id = req.params.id
        
        const name = req.body.name
        const date = req.body.date
        const category = req.body.category
        const amount = req.body.amount
        const month = req.body.month
        return Record.findOne({ _id, userId })
            .then(record => {
                record.name = name
                record.date = date
                record.category = category
                record.amount = amount
                record.month = month
                return record.save()
            })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
    }
    else {
        const id = req.params.id
        return Record.findById(id)
            .lean()
            .then((record) => res.render('edit', { record }))
            .catch(error => console.log(error))
    }

})

//刪除路由
router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


//篩選功能
router.get('/:id/sort', (req, res) => {
    const id = req.params.id
    let totalAmount = 0
    Record.find({ category: id })
        .lean()
        .then(items => {
            items.forEach(item => {
                totalAmount += item.amount
            })
            return items
        })
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
})

router.get('/:id/month', (req, res) => {
    const id = req.params.id
    let totalAmount = 0
    Record.find({ month: id })
        .lean()
        .then(items => {
            items.forEach(item => {
                totalAmount += item.amount
            })
            return items
        })
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
})


let newCategoryname = (category) => {
    if (category === 1) {
        return '家居物業'
    }
    else if (category === 2) {
        return '交通出行'
    }
    else if (category === 3) {
        return '休閒娛樂'
    }
    else if (category === 4) {
        return '餐飲食品'
    }
    else {
        return '其他'
    }
}




module.exports = router