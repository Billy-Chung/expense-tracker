const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({  
    name: String,// 支出名稱
    icon: String,
    category:Number,
    categoryname:String,  
    date: String, //日期
    amount: Number, //金  
    month: {
        type:Number,
        required: true
    },
    shop:String
})


module.exports = mongoose.model('Record', RecordSchema)
