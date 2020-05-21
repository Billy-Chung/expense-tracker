const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({  
    name: {
        type: String,
        default: true
      },
      id: {
        type: String,
        default:true
      },
      icon:{
        type: String,
        default:true
      }
})

module.exports = mongoose.model('category', categorySchema)