const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/artistCovers'

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, coverImageName: {
    type: String,
    required: true
  }
})


artistSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})

module.exports = mongoose.model('Artist', artistSchema)
module.exports.coverImageBasePath = coverImageBasePath