const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({  
    name: String,// 支出名稱
    icon: String,
    category:Number,  
    date: String, //日期
    amount: Number, //金  
    icon:String,    

})


module.exports = mongoose.model('Record', RecordSchema)
