const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({  
    name: String,// 支出名稱
    category:String,  
    date: String, //日期
    amount: String, //金
    icon:String   

})


module.exports = mongoose.model('Record', RecordSchema)
