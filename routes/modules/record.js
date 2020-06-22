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
    if (!isNaN(req.body.amount)) {
        const { name, date, category, amount } = req.body
        if (date.substring(5, 7).charAt(1) === '/') {
            const errors = []
            errors.push({ message: '輸入的日期必須為xxxx/xx/xx格式!!' })
            return res.render('new', { name, date, category, amount, errors })
        }
        else {
            const month = date.substring(5, 7)
            const categoryname = newCategoryname(category)            
            return Record.create({ name, date, category, amount, categoryname, month, userId })
                .then(() => res.redirect('/'))
                .catch(error => console.log(error))
        }

    }
    else {
        const errors = []
        errors.push({ message: '輸入的月份與金額必須是數字!!' })
        const { name, date, category, amount } = req.body
        return res.render('new', { name, date, category, amount, errors })
    }
})

//進入ED路由
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Record.findOne({ _id, userId })
        .lean()
        .then((record) => res.render('edit', { record }))
        .catch(error => console.log(error))
})

//儲存ED路由
router.put('/:id', (req, res) => {
    if (!isNaN(req.body.amount)) {
        const userId = req.user._id
        const _id = req.params.id
        const name = req.body.name
        const date = req.body.date
        const category = req.body.category
        const amount = req.body.amount

        if (date.substring(5, 7).charAt(1) === '/') {
            const errors = []
            errors.push({ message: '輸入的日期必須為xxxx/xx/xx格式!!' })
            return Record.findOne({ _id, userId })
            .lean()
            .then((record) => res.render('edit', { errors, record }))
        }
        else {
            const month = date.substring(5, 7)
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
    }
    else {
        const id = req.params.id
        const errors = []
        errors.push({ message: '輸入的月份與金額必須是數字!!' })
        return Record.findById(id)
            .lean()
            .then((record) => res.render('edit', { record, errors }))
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
router.get('/sort', (req, res) => {
    const id = req.query.whichCategory
    const whichmonth = req.query.whichMonth   
    let totalAmount = 0   
    if(whichmonth === '0' && id !== '0'){
        Record.find({ category: id  })
        .lean()
        .then(items => {
            items.forEach(item => {
                totalAmount += item.amount
            })
            return items
        })        
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
    }
    else if(id === '0' && whichmonth !== '0'){
        Record.find({ month: whichmonth })
        .lean()
        .then(items => {
            items.forEach(item => {
                totalAmount += item.amount
            })
            return items
        })        
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
    }
    else if (id !== '0' && whichmonth !== '0'){
        Record.find({ month: whichmonth, category: id })
        .lean()
        .then(items => {
            items.forEach(item => {
                totalAmount += item.amount
            })
            return items
        })        
        .then(records => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
    }
    else{
        const userId = req.user._id
        const errors = []
        errors.push({ message: '輸入的月份與種類在查詢!!' })
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
        .then(records => res.render('index', { records, totalAmount,errors }))
     }
    
})



let newCategoryname = (category) => {  
    if (category === '1') {
        return '家居物業'
    }
    else if (category === '2') {
        return '交通出行'
    }
    else if (category === '3') {
        return '休閒娛樂'
    }
    else if (category === '4') {
        return '餐飲食品'
    }
    else {
        return '其他'
    }
}

module.exports = router