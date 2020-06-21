const mongoose = require('mongoose')
const path = require('path')



const favoriteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true,
  }
})






module.exports = mongoose.model('Favorite', favoriteSchema)
