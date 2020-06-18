// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const record = require('./modules/record')
const home = require('./modules/home')
const users = require('./modules/users') 

router.use('/records', record)
router.use('/users', users)
router.use('/', home)

module.exports = router