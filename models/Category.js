const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({  
    name: {
        type: String        
      },
      id: {
        type: String   
      },     
      icon:{
        type: String
      }
})

module.exports = mongoose.model('category', categorySchema)